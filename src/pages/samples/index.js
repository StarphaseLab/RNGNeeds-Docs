import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { samplesSectionLink } from "@/components/PageLinks";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(samplesSectionLink());
    }, [router]);

    return null;
};

export default Index;