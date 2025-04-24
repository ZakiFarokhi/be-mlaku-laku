"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function hashPassword(plain) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
}
async function main() {
    const hashedPassword = await hashPassword('password123');
    const admin = await prisma.user.create({
        data: {
            username: 'adminuser',
            password: hashedPassword,
            role: 'OWNER',
        },
    });
    const touristUser = await prisma.user.create({
        data: {
            username: 'touristuser',
            password: hashedPassword,
            role: 'TOURIST',
        },
    });
    const staffUser = await prisma.user.create({
        data: {
            username: 'staffuser',
            password: hashedPassword,
            role: 'STAFF',
        },
    });
    const tourist = await prisma.tourist.create({
        data: {
            userId: touristUser.id,
            fullName: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '08123456789',
            birthDate: new Date('1995-06-15'),
            gender: 'MALE',
            nationality: 'Indonesia',
        },
    });
    await prisma.staffProfile.create({
        data: {
            userId: staffUser.id,
            fullName: 'Jane Staff',
            email: 'jane.staff@example.com',
            position: 'Customer Service',
        },
    });
    await prisma.point.create({
        data: {
            userId: touristUser.id,
            total: 120,
        },
    });
    await prisma.pointTransaction.createMany({
        data: [
            {
                userId: touristUser.id,
                amount: 50,
                type: 'EARN',
                description: 'First review bonus',
            },
            {
                userId: touristUser.id,
                amount: -30,
                type: 'REDEEM',
                description: 'Redeem reward',
            },
        ],
    });
    const reward1 = await prisma.reward.create({
        data: {
            name: 'Discount Voucher',
            description: '10% off on your next booking',
            points: 50,
            stock: 10,
        },
    });
    const reward2 = await prisma.reward.create({
        data: {
            name: 'Free Luggage Tag',
            description: 'Exclusive travel accessory',
            points: 30,
            stock: 25,
        },
    });
    await prisma.rewardRedemption.create({
        data: {
            userId: touristUser.id,
            rewardId: reward1.id,
            status: 'APPROVED',
        },
    });
    const trip = await prisma.trip.create({
        data: {
            touristId: tourist.id,
            destination: 'Bali',
            departureDate: new Date('2025-07-01'),
            returnDate: new Date('2025-07-10'),
            price: 1500000,
            status: 'COMPLETED',
            notes: 'Family vacation',
        },
    });
    await prisma.tripReview.create({
        data: {
            tripId: trip.id,
            touristId: tourist.id,
            rating: 5,
            comment: 'Amazing experience!',
        },
    });
    await prisma.wishlist.create({
        data: {
            userId: touristUser.id,
            destination: 'Japan',
            notes: 'Want to go during cherry blossom season',
        },
    });
    console.log('🌱 Seeding complete');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map