import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData = [
	{
		username: "Alice",
		email: "alice@gmail.com",
		password: "alice123",
	},
	{
		username: "Nilu",
		email: "nilu@gmail.com",
		password: "nilu123",
	},
	{
		username: "Mahmoud",
		email: "mahmoud@gmail.com",
		password: "mahmoud123",
	},
];

async function main() {
	console.log(`Start seeding ...`);
	// Delete all `User` records
	await prisma.user.deleteMany({});

	// Create all `User` records

	// Hash the passwords

	for (const u of userData) {
		const hash = await bcrypt.hash(u.password, 10);
		u.password = hash;
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
