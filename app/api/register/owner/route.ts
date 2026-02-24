
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { FreeOwnerMember } from '@/app/models/user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const { name, email, phoneNumber, password } = body;
    if (!name || !email || !phoneNumber || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Perform more robust validation (e.g., email format, phone number format, password strength).
    // 2. Hash the user's password securely using a library like bcrypt.
    //    const hashedPassword = await bcrypt.hash(password, 10);
    // 3. Save the new user to your database with the hashed password.
    // 4. Implement phone number verification (e.g., via SMS OTP).

    console.log('New Owner Registration:', { name, email, phoneNumber }); // Don't log the password!

    // For now, we'll just simulate a successful registration
    const newUser: Partial<FreeOwnerMember> = {
      uid: `owner-${Date.now()}`,
      name,
      email,
      phoneNumber,
      // password: hashedPassword, // Store the hashed password
      userType: 'owner',
      membershipType: 'free',
      agreedToTerms: true, // Assuming this is handled in the form
      createdAt: new Date(),
    };

    return NextResponse.json({ message: 'Owner registered successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}
