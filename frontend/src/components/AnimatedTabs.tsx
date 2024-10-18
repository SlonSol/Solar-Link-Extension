// src/components/AnimatedTabs.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, User } from 'lucide-react';
import AnimatedBackground from './core/animated-background';

const AnimatedTabs: React.FC = () => {
    const TABS = [
        {
            label: 'Home',
            icon: <Home className='h-5 w-5' />,
            path: '/',
        },
        {
            label: 'Profile',
            icon: <User className='h-5 w-5' />,
            path: '/profile',
        },
        {
            label: 'Settings',
            icon: <Settings className='h-5 w-5' />,
            path: '/settings',
        },
    ];

    return (
        <div className='absolute bottom-4 w-full flex justify-center items-center'>
            <div className='flex space-x-4 rounded-xl border border-zinc-950/10 bg-white p-2 max-w-full overflow-hidden'>
                <AnimatedBackground
                    defaultValue={TABS[0].label}
                    className='rounded-lg bg-zinc-100'
                    transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.3,
                    }}
                >
                    {TABS.map((tab) => (
                        <Link
                            key={tab.label}
                            data-id={tab.label}
                            to={tab.path}
                            type='button'
                            className='inline-flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950'
                        >
                            {tab.icon}
                        </Link>
                    ))}
                </AnimatedBackground>
            </div>
        </div>
    );
}

export default AnimatedTabs;
