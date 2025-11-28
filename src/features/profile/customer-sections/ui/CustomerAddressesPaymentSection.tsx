/**
 * CustomerAddressesPaymentSection Component
 * @module features/profile/customer-sections/ui/CustomerAddressesPaymentSection
 * 
 * ✅ DIAMOND STANDARD: Customer addresses and payment methods
 */

'use client';


export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiration?: string;
}

export interface CustomerAddressesPaymentSectionProps {
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}

export function CustomerAddressesPaymentSection({ addresses, paymentMethods }: CustomerAddressesPaymentSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Addresses */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Addresses</h3>
        {addresses.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No addresses on file</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                    {address.type}
                  </span>
                </div>
                <p className="text-white text-sm">{address.street}</p>
                <p className="text-slate-400 text-sm">
                  {address.city}, {address.state} {address.zipCode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Payment Methods</h3>
        {paymentMethods.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No payment methods on file</p>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((payment) => (
              <div key={payment.id} className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{payment.type}</p>
                    <p className="text-slate-400 text-sm">****  {payment.last4}</p>
                    {payment.expiration && (
                      <p className="text-slate-500 text-xs">Expires: {payment.expiration}</p>
                    )}
                  </div>
                  <span className="text-2xl">
                    {payment.type === 'Visa' ? '💳' : payment.type === 'Mastercard' ? '💳' : '💰'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
