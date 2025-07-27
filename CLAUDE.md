# Claude Context: LPInfo Struct Integration

## Frontend Architecture for LPInfo Data Structure

I built a React TypeScript frontend that maps directly to your Solidity `LPInfo` struct. Here's how the data flows from contract to UI:

## 1. TypeScript Interface Mapping

```typescript
// /src/components/pools-module.tsx
export interface LPInfo {
  actualCollateralAmount: number    // uint256 actualCollateralAmount
  tokensCollateralized: number      // uint256 tokensCollateralized  
  overCollateralization: number     // uint256 overCollateralization
  capacity: number                  // uint256 capacity
  utilization: number               // uint256 utilization
  coverage: number                  // uint256 coverage
  mintShares: number                // uint256 mintShares
  redeemShares: number              // uint256 redeemShares
  interestShares: number            // uint256 interestShares
  isOvercollateralized: boolean     // bool isOvercollateralized
}
```

## 2. Data Integration Points

### Pool/Vault Entity
```typescript
export interface PoolVault {
  // ... other fields
  userPosition?: {
    amount: number
    value: number
    lpInfo: LPInfo          // User-specific LP data
  }
  lpInfo: LPInfo            // Pool-wide LP data
  // ... other fields
}
```

## 3. UI Component Mapping

### User Positions Display (`user-positions.tsx`)
```typescript
// Direct struct field usage in UI:
<div className="bg-white/5 rounded-xl p-3">
  <div className="text-sm text-white/60 mb-1">Collateral</div>
  <div className="text-lg font-semibold text-white">
    ${pool.userPosition?.lpInfo.actualCollateralAmount.toLocaleString()}
  </div>
</div>

<div className="bg-white/5 rounded-xl p-3">
  <div className="text-sm text-white/60 mb-1">Utilization</div>
  <div className="text-lg font-semibold text-white">
    {pool.userPosition?.lpInfo.utilization}%
  </div>
</div>

<div className="bg-white/5 rounded-xl p-3">
  <div className="text-sm text-white/60 mb-1">Coverage</div>
  <div className="text-lg font-semibold text-white">
    {pool.userPosition?.lpInfo.coverage}%
  </div>
</div>

<div className="bg-white/5 rounded-xl p-3">
  <div className="text-sm text-white/60 mb-1">Capacity</div>
  <div className="text-lg font-semibold text-white">
    ${pool.userPosition?.lpInfo.capacity.toLocaleString()}
  </div>
</div>
```

### Pool Details Modal (`pool-details-modal.tsx`)
```typescript
// Comprehensive LPInfo display with all struct fields:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Actual Collateral */}
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="text-sm text-white/60 mb-2">Actual Collateral</div>
    <div className="text-xl font-bold text-white mb-1">
      ${lpInfo.actualCollateralAmount.toLocaleString()}
    </div>
    <div className="text-sm text-white/60">
      {lpInfo.tokensCollateralized.toLocaleString()} tokens
    </div>
  </div>

  {/* Overcollateralization */}
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="text-sm text-white/60 mb-2">Overcollateralization</div>
    <div className="text-xl font-bold text-white mb-1">
      {lpInfo.overCollateralization}%
    </div>
    <div className={`text-sm ${lpInfo.isOvercollateralized ? "text-green-400" : "text-red-400"}`}>
      {lpInfo.isOvercollateralized ? "Healthy" : "At Risk"}
    </div>
  </div>

  {/* Capacity */}
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="text-sm text-white/60 mb-2">LP Capacity</div>
    <div className="text-xl font-bold text-white">
      ${lpInfo.capacity.toLocaleString()}
    </div>
  </div>

  {/* Utilization with Progress Bar */}
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="text-sm text-white/60 mb-2">Utilization Ratio</div>
    <div className="text-xl font-bold text-white mb-2">{lpInfo.utilization}%</div>
    <div className="w-full bg-white/10 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
        style={{ width: `${lpInfo.utilization}%` }}
      />
    </div>
  </div>

  {/* Coverage with Progress Bar */}
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="text-sm text-white/60 mb-2">Collateral Coverage</div>
    <div className="text-xl font-bold text-white mb-2">{lpInfo.coverage}%</div>
    <div className="w-full bg-white/10 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
        style={{ width: `${Math.min(lpInfo.coverage, 100)}%` }}
      />
    </div>
  </div>

  {/* Shares Distribution */}
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="text-sm text-white/60 mb-2">Shares Distribution</div>
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-white/80">Mint</span>
        <span className="text-white">{lpInfo.mintShares}%</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-white/80">Redeem</span>
        <span className="text-white">{lpInfo.redeemShares}%</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-white/80">Interest</span>
        <span className="text-white">{lpInfo.interestShares}%</span>
      </div>
    </div>
  </div>
</div>
```

## 4. Data Flow Pattern

```
Contract LPInfo Struct → Web3 Hook → React Component → UI Display

1. Contract returns LPInfo struct
2. Hook processes uint256 values (likely needs formatUnits conversion)
3. Component receives typed LPInfo object
4. UI renders each field with appropriate formatting
```

## 5. Expected Web3 Integration

```typescript
// Hook example for fetching LPInfo
const { data: lpInfo } = useReadContract({
  address: poolAddress,
  abi: poolAbi,
  functionName: 'getLPInfo',
  args: [userAddress]
})

// Convert BigInt values to numbers for UI
const processedLPInfo: LPInfo = {
  actualCollateralAmount: Number(formatUnits(lpInfo.actualCollateralAmount, 18)),
  tokensCollateralized: Number(formatUnits(lpInfo.tokensCollateralized, 18)),
  overCollateralization: Number(lpInfo.overCollateralization),
  capacity: Number(formatUnits(lpInfo.capacity, 18)),
  utilization: Number(lpInfo.utilization),
  coverage: Number(lpInfo.coverage),
  mintShares: Number(lpInfo.mintShares),
  redeemShares: Number(lpInfo.redeemShares),
  interestShares: Number(lpInfo.interestShares),
  isOvercollateralized: lpInfo.isOvercollateralized
}
```

## 6. Key Design Decisions

- **Direct Field Mapping**: TypeScript interface exactly matches Solidity struct
- **Flexible Display**: Same data used for both pool-wide and user-specific views
- **Visual Indicators**: Progress bars for utilization/coverage, color coding for risk status
- **Comprehensive Coverage**: All 10 struct fields displayed in appropriate UI contexts
- **Responsive Layout**: Grid system adapts to different screen sizes

The frontend is structured to directly consume your `LPInfo` struct with minimal data transformation, making integration straightforward when you connect real contract data.

---

# 🚨 CRITICAL DEVELOPMENT BEST PRACTICES

## ⚠️ MANDATORY: Delete Unused Components & Files

**ALWAYS clean up when adding new features:**

### 1. **Before Creating New Components**
- Check if similar functionality already exists
- Use existing components from `src/components/ui/` when possible
- Extend existing hooks rather than creating duplicates

### 2. **After Creating New Features**
- **DELETE** any old/unused components that were replaced
- **DELETE** deprecated hooks or utilities  
- **DELETE** unused imports and dependencies
- **UPDATE** all references to use new components

### 3. **File Cleanup Checklist** 
```bash
# When creating new features, ALWAYS:
✅ Remove old component files
✅ Delete unused hooks
✅ Clean up imports across all files
✅ Remove duplicate utility functions
✅ Delete old test files if applicable
```

## 📁 **Organized Architecture (Follow This Structure)**

```
src/
├── abi/                    # Contract ABIs (centralized)
├── constants/              # Hardcoded values, addresses
├── types/                  # TypeScript interfaces & types
├── utils/                  # Reusable utility functions
├── hooks/                  # Custom React hooks
├── components/
│   ├── ui/                # Reusable UI components
│   └── [feature]/         # Feature-specific components
└── config/                # Configuration files
```

## 🎯 **Code Quality Standards**

### Import Best Practices
```typescript
// ✅ GOOD - Use centralized imports
import type { Token, LPInfo } from '@/types/contracts'
import { ERC20_ABI } from '@/abi/erc20'
import { formatCurrency } from '@/utils/formatting'

// ❌ BAD - Scattered imports
import { Token } from '@/config/tokens'
import { ERC20_ABI } from '@/config/citadel-contracts'
```

### Component Reusability
```typescript
// ✅ GOOD - Use reusable components
<AmountInput 
  value={amount} 
  onChange={setAmount} 
  variant="deposit"
  maxBalance={balance}
/>

// ❌ BAD - Duplicate input logic everywhere
<input type="number" /* ... lots of repeated code */ />
```

### Hook Optimization
```typescript
// ✅ GOOD - Optimized, centralized hooks
import { useTokenBalance } from '@/hooks/useOptimizedTokenBalance'

// ❌ BAD - Multiple similar hooks
import { useTokenBalance } from '@/hooks/useTokenBalance'
import { useTokenBalances } from '@/hooks/useTokenBalances'
```

## 🧹 **Refactoring Rules**

1. **Never leave dead code** - Delete unused files immediately
2. **Consolidate duplicates** - Merge similar components/hooks
3. **Centralize constants** - No hardcoded values in components  
4. **Use utilities** - Extract formatting/helper functions
5. **Type everything** - Use proper TypeScript interfaces

## 🔄 **When Adding New Features**

### Step 1: Plan & Assess
- Check existing codebase for similar functionality
- Identify components/hooks that can be reused
- Plan what will be deprecated/removed

### Step 2: Implement
- Use existing utilities and components
- Follow established patterns and architecture
- Import from centralized locations

### Step 3: Clean Up (CRITICAL!)
- **DELETE** all files that are no longer used
- Update imports across entire codebase  
- Remove deprecated functionality
- Test that nothing is broken

### Step 4: Verify
- Run build to ensure no broken imports
- Check that all pages still load correctly
- Verify no unused files remain

## 🚫 **Common Mistakes to Avoid**

- ❌ Creating duplicate components instead of reusing existing ones
- ❌ Leaving old files "just in case" - DELETE THEM
- ❌ Hardcoding values instead of using constants
- ❌ Creating separate hooks for similar functionality
- ❌ Not updating imports when refactoring
- ❌ Forgetting to clean up after feature completion

## ✅ **Success Criteria**

Your code is properly maintained when:
- No duplicate functionality exists
- All imports come from centralized locations
- Utility functions are reused across components
- Old/unused files are completely removed
- Code follows consistent patterns and architecture

**Remember: Clean code today prevents technical debt tomorrow!**