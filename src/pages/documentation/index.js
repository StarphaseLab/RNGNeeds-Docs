import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { docsSectionLink } from "@/components/PageLinks";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(docsSectionLink());
    }, [router]);

    return null;
};

export default Index;