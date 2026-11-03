import SettingsForm from '@/app/settings/form';
import { Suspense } from 'react';

export default async function SettingsPage() {

    return <>
        <Suspense fallback={"Loading..."}>
            <SettingsForm />
        </Suspense>
    </>
}