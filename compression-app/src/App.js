import React, { useState } from 'react';

function CompressionExamples() {
  const [originalData, setOriginalData] = useState("");
  const [encodedData, setEncodedData] = useState("");
  const [compressionType, setCompressionType] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const compressData = () => {
    let binaryData = originalData;
    if (!/^[01]+$/.test(binaryData)) {
      alert("Please enter a valid binary number.");
      return;
    }

    switch (compressionType) {
      case "Huffman":
        setEncodedData(huffmanEncode(binaryData));
        break;
      case "RLE":
        setEncodedData(rleEncode(binaryData));
        break;
      case "Arithmetic":
        setEncodedData(arithmeticEncode(binaryData));
        break;
      case "LZW":
        setEncodedData(lzwEncode(binaryData));
        break;
      default:
        break;
    }
  };

  const huffmanEncode = (data) => {
    // Placeholder Huffman coding compression implementation
    const freqMap = {};
    for (let i = 0; i < data.length; i++) {
      if (freqMap[data[i]]) {
        freqMap[data[i]]++;
      } else {
        freqMap[data[i]] = 1;
      }
    }
    let encodedData = "";
    for (let i = 0; i < data.length; i++) {
      encodedData += freqMap[data[i]];
    }
    return encodedData;
  };

  const rleEncode = (data) => {
    // Placeholder Run-Length Encoding compression implementation
    let encodedData = "";
    let count = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === data[i + 1]) {
        count++;
      } else {
        encodedData += count + data[i];
        count = 1;
      }
    }
    return encodedData;
  };

  const arithmeticEncode = (data) => {
    // Placeholder Arithmetic coding compression implementation
    let encodedData = "";
    for (let i = 0; i < data.length; i++) {
      encodedData += data[i] === '0' ? '1' : '0'; // Inverting each bit
    }
    return encodedData;
  };

  const lzwEncode = (data) => {
    // Placeholder Lempel-Ziv-Welch (LZW) compression implementation
    // This is a simplified example
    const dictionary = {};
    let nextCode = 256;
    let encodedData = "";
    let currentSequence = "";
    
    for (let i = 0; i < data.length; i++) {
      const symbol = data[i];
      const sequence = currentSequence + symbol;
      if (dictionary[sequence] !== undefined) {
        currentSequence = sequence;
      } else {
        encodedData += dictionary[currentSequence] + " ";
        dictionary[sequence] = nextCode++;
        currentSequence = symbol;
      }
    }
    encodedData += dictionary[currentSequence];
    
    return encodedData;
  };

  const renderExplanation = () => {
    let explanation = "";

    switch (compressionType) {
      case "Huffman":
        explanation = "Huffman coding is a method of lossless data compression that assigns variable-length codes to input characters, with shorter codes representing more frequent characters.";
        break;
      case "RLE":
        explanation = "Run-Length Encoding (RLE) is a simple form of data compression that replaces sequences of the same data symbol with a count and a single instance of the symbol.";
        break;
      case "Arithmetic":
        explanation = "Arithmetic coding is a method of lossless data compression that encodes a string of data as a fraction in the interval [0,1) and maps it to a subinterval corresponding to the original data.";
        break;
      case "LZW":
        explanation = "Lempel-Ziv-Welch (LZW) Compression is a dictionary-based compression algorithm that replaces sequences of characters with codes, with the dictionary dynamically updated as new sequences are encountered.";
        break;
      default:
        explanation = "No compression selected.";
        break;
    }

    return (
      <div>
        <h2>Compression Explanation:</h2>
        <p>{explanation}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Data Compression Examples</h1>
      <div>
        <h2>Instructions:</h2>
        <ol>
          <li>Enter the binary data in the input field below.</li>
          <li>Select the compression type from the dropdown list.</li>
          <li>Click the "Compress" button to see the encoded data.</li>
          <li>Click on "Show Explanation" to learn more about the selected compression technique.</li>
        </ol>
      </div>
      <div>
        <label>Binary Data:</label>
        <input 
          type="text" 
          value={originalData} 
          onChange={(e) => setOriginalData(e.target.value)} 
        />
      </div>
      <div>
        <label>Compression Type:</label>
        <select 
          value={compressionType} 
          onChange={(e) => setCompressionType(e.target.value)}
        >
          <option value="">Select Compression Type</option>
          <option value="Huffman">Huffman Coding</option>
          <option value="RLE">Run-Length Encoding (RLE)</option>
          <option value="Arithmetic">Arithmetic Coding</option>
          <option value="LZW">Lempel-Ziv-Welch (LZW) Compression</option>
        </select>
      </div>
      <button onClick={compressData}>Compress</button>
      <button onClick={() => setShowExplanation(!showExplanation)}>
        {showExplanation ? "Hide Explanation" : "Show Explanation"}
      </button>
      {showExplanation && renderExplanation()}
      {encodedData && (
        <div>
          <h2>Encoded Data:</h2>
          <p>{encodedData}</p>
        </div>
      )}
    </div>
  );
}

export default CompressionExamples;