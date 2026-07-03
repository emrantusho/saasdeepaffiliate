import React from 'react';
import { prisma } from '@/lib/prisma';
import RegisterForm from './register-form';

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  let companyName = '';
  let companyLogo = '';

  try {
    const settings = await prisma.programSettings.findFirst({
      select: { companyName: true, companyLogo: true },
    });
    if (settings) {
      companyName = settings.companyName || '';
      companyLogo = settings.companyLogo || '';
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md space-y-6">
        <RegisterForm branding={{ companyName, companyLogo }} />
      </div>
    </div>
  );
}
