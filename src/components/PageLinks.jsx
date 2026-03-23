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
export const DesigningAListPage = createPage("Designing a List", "/designing-a-list");
export const SelectingValuesPage = createPage("Selecting Values", "/selecting-values");
export const RepeatPreventionPage = createPage("Repeat Prevention", "/repeat-prevention");
export const ProbabilityInfluencePage = createPage("Probability Influence", "/probability-influence");
export const TestingOutcomesPage = createPage("Testing Outcomes", "/testing-outcomes");
export const SeedingOptionsPage = createPage("Seeding Options", "/seeding-options");
export const PickHistoryPage = createPage("Pick History", "/pick-history");
export const NestingListsPage = createPage("Nesting Lists", "/nesting-lists");
export const CustomizingListsPage = createPage("Customizing Lists", "/customizing-lists");
export const DepletableListsPage = createPage("Depletable Lists", "/depletable-lists");
export const ChangelogPage = createPage("Change Log", "/change-log");

export const SamplesOverviewPage = createPage("Overview", "/samples-overview");
export const SamplesDicePlaygroundPage = createPage("Dice Playground", "/dice-playground");
export const SamplesRandomAudioPage = createPage("Random Audio", "/random-audio");
export const SamplesMonsterSpawnerPage = createPage("Monster Spawner", "/monster-spawner");
export const SamplesTreasureChestPage = createPage("Treasure Chest (WIP)", "/treasure-chest");

export const GuidesOverview = createPage("Overview", "/guides-overview")
export const GuideSelectingDistinctValues = createPage("Selecting Distinct Values", "/guide-selecting-distinct-values");
export const GuideProbabilityInfluence = createPage("Probability Influence Guides", "/guide-probability-influence");
export const GuidePLCollection = createPage("PLCollection Guides", "/guide-plcollection");
export const GuideDepletableList = createPage("Depletable List Examples", "/guide-depletable-list-examples");

export const API_Overview = createPage("API Overview", "/api-overview");
export const API_RNGNeeds = createPage("RNGNeeds Core", "/rngneeds");
export const API_ProbabilityList = createPage("ProbabilityList<T>", "/probability-list");
export const API_ProbabilityItem = createPage("ProbabilityItem<T>", "/probability-item");
export const API_PickHistory = createPage("PickHistory", "/pick-history");
export const API_SelectionMethods = createPage("Selection Methods", "/selection-methods");
export const API_SeedProvider = createPage("Seed Providers", "/seed-provider");
export const API_PLCollection = createPage("PLCollection<T>", "/pl-collection");

export function docsSectionLink() {
    return DocsOverviewPage.Link;
}

export function userGuideSectionLink() {
    return IntroductionPage.Link;
}

export function samplesSectionLink() {
    return SamplesOverviewPage.Link;
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
            DepletableListsPage,
            RepeatPreventionPage,
            ProbabilityInfluencePage,
            TestingOutcomesPage,
            SeedingOptionsPage,
            PickHistoryPage,
            NestingListsPage,
            CustomizingListsPage,
            ChangelogPage
        ],
    },
    {
        title: 'Samples',
        link: '/samples',
        pages: [
            SamplesOverviewPage,
            SamplesDicePlaygroundPage,
            SamplesRandomAudioPage,
            SamplesMonsterSpawnerPage
            // SamplesTreasureChestPage,
        ],
    },
    {
        title: 'Guides',
        link: '/guides',
        pages: [
            GuidesOverview,
            GuideSelectingDistinctValues,
            GuideProbabilityInfluence,
            GuidePLCollection,
            GuideDepletableList
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
            API_SeedProvider,
            API_PLCollection
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