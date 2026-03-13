"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database with leather products...');
    // Optional: Clean up existing data
    await prisma.orderItem.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    // We can't easily delete users safely if relations are tight, handled later or soft deletes.
    const products = [
        {
            name: 'Classic Leather Tote',
            price: 150.0,
            stock: 30,
            description: 'A spacious and durable real leather tote bag perfect for everyday use.',
            imageUrl: 'assets/images/leatherbag1.jpg',
            category: 'BAGS'
        },
        {
            name: 'Vintage Satchel',
            price: 185.0,
            stock: 15,
            description: 'Handcrafted vintage leather satchel with brass fittings.',
            imageUrl: 'assets/images/leatherbag2.jpg',
            category: 'BAGS'
        },
        {
            name: 'Slim Leather Bifold Wallet',
            price: 45.0,
            stock: 100,
            description: 'Minimalist bifold wallet crafted from full-grain leather.',
            imageUrl: 'assets/images/leatherbag3.jpg',
            category: 'WALLETS'
        },
        {
            name: 'RFID Blocking Cardholder',
            price: 35.0,
            stock: 150,
            description: 'Secure your cards in style with this compact leather cardholder.',
            imageUrl: 'assets/images/leatherbag4.jpg',
            category: 'WALLETS'
        },
        {
            name: 'Heavy Duty Leather Belt',
            price: 60.0,
            stock: 50,
            description: 'Thick, rugged leather belt designed to last a lifetime.',
            imageUrl: 'assets/images/leatherbag3.jpg',
            category: 'BELTS'
        },
        {
            name: 'Dress Belt (Brown)',
            price: 55.0,
            stock: 60,
            description: 'Sleek dress belt for formal occasions, finished with a polished buckle.',
            imageUrl: 'assets/images/leatherbag2.jpg',
            category: 'BELTS'
        },
        {
            name: 'Leather Key Fob',
            price: 15.0,
            stock: 200,
            description: 'Simple and elegant leather key fob with a brass ring.',
            imageUrl: 'assets/images/leatherbag1.jpg',
            category: 'ACCESSORIES'
        },
        {
            name: 'Braided Leather Bracelet',
            price: 25.0,
            stock: 80,
            description: 'Hand-braided leather bracelet, adjustable size.',
            imageUrl: 'assets/images/leatherbag4.jpg',
            category: 'ACCESSORIES'
        },
        {
            name: 'Canvas & Leather Duffel',
            price: 220.0,
            stock: 10,
            description: 'Weekend duffel bag combining rugged waxed canvas and premium leather.',
            imageUrl: 'assets/images/leatherbag3.jpg',
            category: 'BAGS'
        },
        {
            name: 'Leather Notebook Cover',
            price: 75.0,
            stock: 45,
            description: 'Refillable leather cover for standard notebooks. Ages beautifully.',
            imageUrl: 'assets/images/leatherbag1.jpg',
            category: 'OTHER'
        },
        {
            name: 'Minimalist Desk Pad',
            price: 90.0,
            stock: 25,
            description: 'Large leather desk pad to elevate your workspace.',
            imageUrl: 'assets/images/leatherbag2.jpg',
            category: 'OTHER'
        },
        {
            name: 'Leather Passport Holder',
            price: 40.0,
            stock: 70,
            description: 'Travel in style with this slim leather passport cover.',
            imageUrl: 'assets/images/leatherbag4.jpg',
            category: 'WALLETS'
        },
        {
            name: 'Messenger Bag',
            price: 195.0,
            stock: 20,
            description: 'Professional leather messenger bag with dedicated laptop sleeve.',
            imageUrl: 'assets/images/leatherbag1.jpg',
            category: 'BAGS'
        },
        {
            name: 'Tool Roll',
            price: 85.0,
            stock: 35,
            description: 'Secure your tools with this heavy canvas and leather trim tool roll.',
            imageUrl: 'assets/images/leatherbag3.jpg',
            category: 'OTHER'
        },
        {
            name: 'Woven Leather Belt',
            price: 65.0,
            stock: 40,
            description: 'Intricately woven leather belt for a more casual look.',
            imageUrl: 'assets/images/leatherbag2.jpg',
            category: 'BELTS'
        }
    ];
    for (const p of products) {
        await prisma.product.create({
            data: p
        });
    }
    console.log('Seeding completely successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
