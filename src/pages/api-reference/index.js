import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiReferenceSectionLink } from "@/components/PageLinks";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(apiReferenceSectionLink());
    }, []);

    return null;
};

export default Index;