# SimpleDEX

A basic decentralized exchange (DEX) using Constant Product Automated Market Maker (AMM) algorithm.

## 🌟 Features

- **Constant Product AMM (x*y=k)**: Uses the same algorithm as Uniswap V2
- **Liquidity Management**: Add and remove liquidity to earn trading fees
- **Token Swap**: Exchange between two ERC20 tokens
- **0.3% Trading Fee**: Distributed to liquidity providers
- **Security**: Protected against reentrancy attacks using OpenZeppelin

## 📋 Technical Stack

- **Solidity**: ^0.8.20
- **Hardhat**: Development environment
- **OpenZeppelin**: Security and standard implementations
- **Ethers.js**: Blockchain interactions
- **Chai**: Testing framework

## 🏗️ Contract Architecture

### SimpleDEX.sol
Main DEX contract implementing AMM functionality:
- `addLiquidity()`: Add token pairs to the liquidity pool
- `removeLiquidity()`: Remove liquidity and get tokens back
- `swap()`: Exchange one token for another
- `getAmountOut()`: Calculate swap output amount

### TestToken.sol
ERC20 token for testing purposes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/code-craftsman369/SimpleDEX.git
cd SimpleDEX

# Install dependencies
npm install
```

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

Expected output:
```
SimpleDEX
  流動性の追加
    ✔ 初回の流動性追加が成功すること
  スワップ機能
    ✔ TokenA → TokenB のスワップが成功すること
    ✔ TokenB → TokenA のスワップが成功すること
  流動性の削除
    ✔ 流動性の削除が成功すること

4 passing (434ms)
```

## 📊 How It Works

### Constant Product Formula

The AMM uses the constant product formula:
```
x * y = k
```

Where:
- `x` = Reserve of Token A
- `y` = Reserve of Token B
- `k` = Constant

When you swap tokens, the product `k` remains constant (minus fees).

### Example: Token Swap

1. Initial pool: 1000 Token A, 1000 Token B
2. User swaps 10 Token A
3. New reserves calculated to maintain `k`
4. 0.3% fee deducted from input

## 🧪 Test Coverage

| Test Case | Status |
|-----------|--------|
| Add initial liquidity | ✅ Pass |
| Swap Token A to Token B | ✅ Pass |
| Swap Token B to Token A | ✅ Pass |
| Remove liquidity | ✅ Pass |

## 🛡️ Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Access control for administrative functions
- **Safe Math**: Built-in overflow protection (Solidity ^0.8.0)
- **Input Validation**: Comprehensive require statements

## 📚 Learning Resources

This project was built to learn:
- Automated Market Maker (AMM) mechanics
- Liquidity pool management
- DeFi protocols
- Smart contract security best practices

## 🔮 Future Improvements

- [ ] Multi-token pair support
- [ ] Slippage protection
- [ ] Price oracle integration
- [ ] Frontend interface
- [ ] Deploy to Sepolia testnet

## 📝 License

MIT

## 👤 Author

**Tatsu**  
GitHub: [@code-craftsman369](https://github.com/code-craftsman369)  
X: [@web3_builder369](https://twitter.com/web3_builder369)

## 🙏 Acknowledgments

- OpenZeppelin for secure contract implementations
- Uniswap for AMM inspiration
- Hardhat for excellent development tools
