import React from "react";
import {} from "./index.css";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [character, allowCharacter] = useState(false);
  const [number, allowNumber] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState("Copy to Clipboard");
  //useRef
  const passwordRef = useRef(null);

  //function to generate the password
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number === true) {
      str += "123456789";
    }
    if (character === true) {
      str += "!@#$%&*";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setCopiedPassword("Copy to Clipboard");

    setPassword(pass);
  }, [length, character, number, setPassword]);

  //copy to clipboard function
  const copyClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(1, 100);
    window.navigator.clipboard.writeText(password);
    setCopiedPassword("Password Copied");

    // setTimeout(()=>{setCopiedPassword("Copy to Clipboard")},2000)
  }, [password]);

  //useRef
  useEffect(() => {
    generatePassword();
    passwordRef.current?.focus();
  }, [length, number, character, generatePassword]);

  return (
    <>
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 class="text-2xl font-semibold mb-6 text-center">
            Password Generator
          </h1>
          {/* Password Input */}
          <div class="mb-4">
            <label
              for="password"
              class="text-sm block font-medium text-gray-600"
            >
              Generated Password
            </label>
            <input
              type="text"
              id="password"
              class="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              readonly
              value={password}
            />
          </div>

          {/* Password Length Slider */}
          <div class="mb-4">
            <label for="length" class="text-sm block font-medium text-gray-600">
              Password Length: <span id="lengthValue">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min="8"
              max="100"
              class="w-full mt-2"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>

          {/* Checkbox for Numbers */}

          <div class="mb-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                id="includeNumbers"
                class="form-checkbox"
                defaultChecked={number}
                value={number}
                onChange={() => {
                  allowNumber((prev) => !prev);
                }}
              />
              <span class="ml-2 text-sm">Include Numbers</span>
            </label>
          </div>

          {/* Checkbox for Special Characters  */}
          <div class="mb-6">
            <label class="flex items-center">
              <input
                type="checkbox"
                id="includeSpecialChars"
                class="form-checkbox"
                defaultChecked={character}
                value={character}
                onChange={() => {
                  allowCharacter((prev) => !prev);
                }}
              />
              <span class="ml-2 text-sm">Include Special Characters</span>
            </label>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyClipBoard}
            id="copyButton"
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {copiedPassword}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
