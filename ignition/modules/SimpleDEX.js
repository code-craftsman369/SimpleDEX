const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleDEXModule", (m) => {
  // まずテスト用トークンを2つデプロイ
  const tokenA = m.contract("TestToken", [
    "Token A",
    "TKA",
    "1000000000000000000000000" // 1,000,000 tokens (18 decimals)
  ], { id: "TokenA" });

  const tokenB = m.contract("TestToken", [
    "Token B", 
    "TKB",
    "1000000000000000000000000" // 1,000,000 tokens (18 decimals)
  ], { id: "TokenB" });

  // SimpleDEXをデプロイ
  const simpleDEX = m.contract("SimpleDEX", [tokenA, tokenB]);

  return { tokenA, tokenB, simpleDEX };
});