/**
 * CustomerLoyaltyRewardsSection Component
 * @module features/profile/customer-sections/ui/CustomerLoyaltyRewardsSection
 * 
 * ✅ DIAMOND STANDARD: Customer loyalty program and rewards
 */

'use client';


export interface CustomerLoyaltyRewardsSectionProps {
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  rewards: { id: string; name: string; cost: number; claimed: boolean }[];
}

export function CustomerLoyaltyRewardsSection({ points, tier, rewards }: CustomerLoyaltyRewardsSectionProps) {
  const getTierColor = () => {
    switch (tier) {
      case 'Bronze': return 'text-orange-400';
      case 'Silver': return 'text-slate-300';
      case 'Gold': return 'text-yellow-400';
      case 'Platinum': return 'text-purple-400';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Loyalty & Rewards</h3>
      
      <div className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm">Current Tier</p>
            <h4 className={`text-3xl font-bold ${getTierColor()}`}>{tier}</h4>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Points Balance</p>
            <h4 className="text-3xl font-bold text-white">{points.toLocaleString()}</h4>
          </div>
        </div>
      </div>

      <h4 className="text-white font-semibold mb-3">Available Rewards</h4>
      {rewards.length === 0 ? (
        <p className="text-slate-400 text-center py-4">No rewards available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-slate-800 rounded-lg p-4">
              <h5 className="text-white font-medium text-sm mb-1">{reward.name}</h5>
              <p className="text-slate-400 text-xs mb-2">{reward.cost} points</p>
              {reward.claimed ? (
                <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Claimed</span>
              ) : (
                <button
                  disabled={points < reward.cost}
                  className={`px-3 py-1 rounded text-xs ${
                    points >= reward.cost
                      ? 'bg-sky-600 hover:bg-sky-700 text-white'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Claim
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
