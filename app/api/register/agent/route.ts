
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { FreeAgentMember } from '@/app/models/user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation for agent-specific fields
    const { name, email, phoneNumber, password, agentLicenseNumber, brokerageRegistrationNumber, businessRegistrationNumber } = body;
    if (!name || !email || !phoneNumber || !password || !agentLicenseNumber || !brokerageRegistrationNumber || !businessRegistrationNumber) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Perform more robust validation (e.g., password strength).
    // 2. Hash the user's password securely using a library like bcrypt.
    //    const hashedPassword = await bcrypt.hash(password, 10);
    // 3. Save the new user to your database with the hashed password.
    // 4. Potentially verify the agent's license number against a government database.

    console.log('New Agent Registration:', { name, email, phoneNumber, agentLicenseNumber }); // Don't log the password!

    // Simulate a successful registration
    const newUser: Partial<FreeAgentMember> = {
      uid: `agent-${Date.now()}`,
      name,
      email,
      phoneNumber,
      // password: hashedPassword, // Store the hashed password
      userType: 'agent',
      membershipType: 'free',
      agentLicenseNumber,
      brokerageRegistrationNumber,
      businessRegistrationNumber,
      isApproved: false, // Agents require admin approval
      agreedToTerms: true,
      createdAt: new Date(),
    };

    return NextResponse.json({ message: 'Agent registration submitted for approval', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}
