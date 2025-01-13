import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const useTabParams = (paramKey: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the tab index from the URL search params, defaulting to 0 if not found
  const getTabFromUrl = () => {
    const tabIndex = searchParams.get(paramKey);
    return tabIndex ? parseInt(tabIndex, 10) : 0; // Default to 0 if no tab in URL
  };

  const [selectedTab, setSelectedTab] = useState<number>(getTabFromUrl);

  // Sync the selected tab with the URL query parameter
  const setTabInUrl = (tabIndex: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(paramKey, tabIndex.toString());
    router.push("?" + newSearchParams.toString());
  };

  // Handle tab change
  const onTabClick = (index: number) => {
    setSelectedTab(index);
    setTabInUrl(index);
  };

  // Keep the tab state updated when the URL changes
  useEffect(() => {
    const urlTabIndex = getTabFromUrl();
    if (urlTabIndex !== selectedTab) {
      setSelectedTab(urlTabIndex);
    }
  }, [searchParams]);

  return {
    selectedTab,  // Expose selectedTab to parent components
    onTabClick,    // Expose onTabClick to parent components
  };
};

export default useTabParams;
