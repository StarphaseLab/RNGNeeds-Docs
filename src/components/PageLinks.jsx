function createPage(Title, RelativeLink) {
    return {
        Title,
        RelativeLink,
        get Link() {
            return getFullLinkForPage(this);
        }
    };
}

export const IntroductionPage = createPage("Introduction", "/introduction");
export const GettingStartedPage = createPage("Getting Started", "/getting-started");
export const UserInterfacePage = createPage("User Interface", "/user-interface");
export const PreferencesPage = createPage("Preferences", "/preferences");
export const FAQPage = createPage("FAQ", "/faq");
export const SupportPage = createPage("Support", "/support");

export const DocsOverviewPage = createPage("Overview", "/docs-overview");
export const TerminologyPage = createPage("Terminology", "/terminology");
export const DesigningAListPage = createPage("Designing a List (WIP)", "/designing-a-list");
export const SelectingValuesPage = createPage("Selecting Values (WIP)", "/selecting-values");
export const RepeatPreventionPage = createPage("Repeat Prevention (WIP)", "/repeat-prevention");
export const ProbabilityInfluencePage = createPage("Probability Influence (WIP)", "/probability-influence");
export const TestingOutcomesPage = createPage("Testing Outcomes (WIP)", "/testing-outcomes");
export const SeedingOptionsPage = createPage("Seeding Options (WIP)", "/seeding-options");
export const PickHistoryPage = createPage("Pick History (WIP)", "/pick-history");

export const ChangelogPage = createPage("Change Log", "/change-log");

export const ExamplesOverviewPage = createPage("Overview (WIP)", "/examples-overview");
export const ExamplesBasicPage = createPage("Basic Examples (WIP)", "/basic-examples");
export const ExamplesIntermediatePage = createPage("Intermediate Examples (WIP)", "/intermediate-examples");
export const ExamplesAdvancedPage = createPage("Advanced Examples (WIP)", "/advanced-examples");
export const ExamplesDeepDivePage = createPage("Influence Deep Dive (WIP)", "/influence-deep-dive");

export const API_Overview = createPage("API Overview", "/api-overview");
export const API_RNGNeeds = createPage("RNGNeeds (WIP)", "/rngneeds");
export const API_ProbabilityList = createPage("Probability List (WIP)", "/probability-list");
export const API_ProbabilityItem = createPage("Probability Item (WIP)", "/probability-item");
export const API_PickHistory = createPage("Pick History (WIP)", "/pick-history");
export const API_SelectionMethods = createPage("Selection Methods (WIP)", "/selection-methods");
export const API_SeedProvider = createPage("Seed Provider (WIP)", "/seed-provider");

export function docsSectionLink() {
    return DocsOverviewPage.Link;
}

export function userGuideSectionLink() {
    return IntroductionPage.Link;
}

export function examplesSectionLink() {
    return ExamplesOverviewPage.Link;
}

export function apiReferenceSectionLink() {
    return API_Overview.Link;
}

export const sections = [
    {
        title: 'User Guide',
        link: '/user-guide',
        pages: [
            IntroductionPage,
            GettingStartedPage,
            UserInterfacePage,
            PreferencesPage,
            FAQPage,
            SupportPage
        ],
    },
    {
        title: 'Documentation',
        link: '/documentation',
        pages: [
            DocsOverviewPage,
            TerminologyPage,
            DesigningAListPage,
            SelectingValuesPage,
            RepeatPreventionPage,
            ProbabilityInfluencePage,
            TestingOutcomesPage,
            SeedingOptionsPage,
            PickHistoryPage,
            ChangelogPage
        ],
    },
    {
        title: 'Examples',
        link: '/examples',
        pages: [
            ExamplesOverviewPage,
            ExamplesBasicPage,
            ExamplesIntermediatePage,
            ExamplesAdvancedPage,
            ExamplesDeepDivePage
        ],
    },
    {
        title: 'API Reference',
        link: '/api-reference',
        pages: [
            API_Overview,
            API_RNGNeeds,
            API_ProbabilityList,
            API_ProbabilityItem,
            API_PickHistory,
            API_SelectionMethods,
            API_SeedProvider
        ],
    },
];

// Function to find full link for a page
export function getFullLinkForPage(page) {
    // Find the section that contains the page
    const section = sections.find(section => section.pages.includes(page));

    // If the page isn't in any section, return just the relative link
    if (!section) return page.RelativeLink;

    // Otherwise, return the full link
    return section.link + page.RelativeLink;
}