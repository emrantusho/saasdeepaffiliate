import React from 'react';
import { prisma } from '@/lib/prisma';
import LoginForm from './login-form';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  let companyName = '';
  let companyLogo = '';
  let disableOtp = false;

  try {
    const settings = await prisma.programSettings.findFirst({
      select: { companyName: true, companyLogo: true, disableOtp: true },
    });
    if (settings) {
      companyName = settings.companyName || '';
      companyLogo = settings.companyLogo || '';
      disableOtp = settings.disableOtp || false;
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md space-y-6">
        <LoginForm branding={{ companyName, companyLogo, disableOtp }} />
      </div>
    </div>
  );
}
