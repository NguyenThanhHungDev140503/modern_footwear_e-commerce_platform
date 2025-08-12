import * as React from 'react'
import { Cross2Icon, PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
}

export function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: '1',
      name: 'Nike Air Jordan 1 Retro High OG',
      price: 180,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329',
      size: 'US 9'
    },
    {
      id: '2',
      name: 'Adidas Yeezy Boost 350 V2',
      price: 220,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
      size: 'US 10'
    }
  ])

  const [isLoading, setIsLoading] = React.useState(false)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoading(false)
    
    // Navigate to checkout page
    navigate('/checkout')
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Your cart is empty</p>
              <Button className="mt-4">Continue Shopping</Button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  <p className="font-bold mt-2">${item.price}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Cross2Icon className="h-4 w-4" />
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <Dialog.Title className="text-lg font-bold mb-4">
                          Remove Item
                        </Dialog.Title>
                        <Dialog.Description className="mb-6">
                          Are you sure you want to remove this item from your cart?
                        </Dialog.Description>
                        <div className="flex justify-end gap-2">
                          <Dialog.Close asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.Close>
                          <Dialog.Close asChild>
                            <Button
                              variant="destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </Button>
                          </Dialog.Close>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Order Summary */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <Button
            className="w-full mt-6"
            onClick={handleCheckout}
            disabled={isLoading || cartItems.length === 0}
          >
            {isLoading ? 'Processing...' : 'Checkout'}
          </Button>
        </div>
      </div>
    </div>
  )
}
