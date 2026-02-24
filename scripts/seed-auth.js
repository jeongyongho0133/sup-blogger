
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// IMPORTANT: Path to your service account key file
// Download this from your Firebase project settings
const serviceAccount = require('../serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth();

const users = [
  {
    uid: 'test-owner-001',
    email: 'user@test.com',
    password: 'password123',
    displayName: '테스트 소유주',
    customClaims: { role: 'owner', userType: 'owner' },
  },
  {
    uid: 'test-agent-001',
    email: 'real@test.com',
    password: 'password123',
    displayName: '테스트 공인중개사',
    customClaims: { role: 'agent', userType: 'agent', isApproved: true },
  },
  {
    uid: 'test-admin-001',
    email: 'admin@test.com',
    password: 'password123',
    displayName: '테스트 관리자',
    customClaims: { role: 'admin' },
  },
];

const createOrUpdateUser = async (userConfig) => {
  try {
    // Check if user exists
    await auth.getUserByEmail(userConfig.email);
    // If user exists, update them
    console.log(`Updating user: ${userConfig.email}`);
    const user = await auth.updateUser(userConfig.uid, {
      password: userConfig.password,
      displayName: userConfig.displayName,
    });
    await auth.setCustomUserClaims(user.uid, userConfig.customClaims);
    console.log(`Successfully updated user: ${userConfig.email}`);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // If user does not exist, create them
      console.log(`Creating user: ${userConfig.email}`);
      const user = await auth.createUser({
        uid: userConfig.uid,
        email: userConfig.email,
        password: userConfig.password,
        displayName: userConfig.displayName,
      });
      await auth.setCustomUserClaims(user.uid, userConfig.customClaims);
      console.log(`Successfully created user: ${userConfig.email}`);
    } else {
      console.error(`Error processing user ${userConfig.email}:`, error);
    }
  }
};

const seedAuth = async () => {
  console.log('Starting auth seeding...');
  for (const user of users) {
    await createOrUpdateUser(user);
  }
  console.log('Auth seeding finished.');
};

seedAuth().catch(console.error);
