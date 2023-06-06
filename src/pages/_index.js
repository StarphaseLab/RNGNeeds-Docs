import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { userGuideSectionLink } from "@/components/PageLinks";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(userGuideSectionLink());
    }, [router]);

    return null;
};

export default Index;