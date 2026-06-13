const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;
const email = process.argv[2];

if (!mongoUri) {
  console.error('MONGODB_URI is missing. Set it before running this script.');
  process.exit(1);
}

if (!email) {
  console.error('Usage: yarn make-admin <email>');
  process.exit(1);
}

async function main() {
  await mongoose.connect(mongoUri, { dbName: 'parking' });

  const userSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      name: { type: String },
    },
    { timestamps: true }
  );

  const User = mongoose.models.User || mongoose.model('User', userSchema);
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { role: 'admin' } },
    { new: true }
  );

  if (!user) {
    console.error(`No user found for ${email}. Create the account first, then run this again.`);
    process.exit(1);
  }

  console.log(`Promoted ${email} to admin.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error('Failed to promote admin:', error.message || error);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
