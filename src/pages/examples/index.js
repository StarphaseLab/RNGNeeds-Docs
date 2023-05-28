import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { examplesSectionLink } from "@/components/PageLinks";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(examplesSectionLink());
    }, [router]);

    return null;
};

export default Index;