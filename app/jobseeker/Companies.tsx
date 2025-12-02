import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import StatsRow from "@/src/features/jobseeker/company/StatsRow";
import CompanyCard from "@/src/features/jobseeker/company/CompanyCard";
import companiesJSON from "@/assets/data/companies.json";
import AppSearchBar from "@/src/components/ui/AppSearchBar";
import FilterSheet from "@/src/features/jobseeker/company/FilterSheet";

const PAGE_SIZE = 3;
const industries = ["All", "Technology", "IT Services", "Design"];

// Expand fake dataset for infinite scroll demo
const companiesData = Array.from({ length: 4 })
  .map((_, batchIndex) =>
    companiesJSON.map((c) => ({
      ...c,
      id: `${c.id}-${batchIndex}`,
    }))
  )
  .flat();

const Companies = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCompanies = useMemo(() => {
    const lower = searchTerm.toLowerCase();

    return companiesData.filter((c) => {
      const matchesText =
        !lower ||
        c.name.toLowerCase().includes(lower) ||
        c.industry.toLowerCase().includes(lower);

      const matchesIndustry =
        selectedIndustry === "All" || c.industry === selectedIndustry;

      return matchesText && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm, selectedIndustry]);

  const visibleCompanies = filteredCompanies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCompanies.length;

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
    Keyboard.dismiss();
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSearchInput("");
      setSearchTerm("");
      setSelectedIndustry("All");
      setVisibleCount(PAGE_SIZE);
      setIsRefreshing(false);
    }, 900);
  };

  const loadMore = () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + PAGE_SIZE, filteredCompanies.length)
      );
      setIsLoadingMore(false);
    }, 900);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - 100
    ) {
      loadMore();
    }
  };

  const SkeletonCard = () => (
    <View className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
      <View className="flex-row items-center gap-4 mb-4 animate-pulse">
        <View className="w-12 h-12 rounded-xl bg-gray-200" />
        <View className="flex-1 gap-2">
          <View className="h-4 bg-gray-200 rounded-md w-3/4" />
          <View className="h-3 bg-gray-200 rounded-md w-1/2" />
        </View>
      </View>

      <View className="gap-2 mb-4 animate-pulse">
        <View className="h-4 bg-gray-200 rounded-md w-1/3" />
        <View className="h-3 bg-gray-200 rounded-md w-2/3" />
        <View className="h-3 bg-gray-200 rounded-md w-1/2" />
      </View>

      <View className="h-12 bg-gray-200 rounded-md mb-4 animate-pulse" />

      <View className="flex-row gap-2 animate-pulse">
        <View className="flex-1 h-6 bg-gray-200 rounded-md" />
        <View className="flex-1 h-6 bg-gray-200 rounded-md" />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Search */}
        <AppSearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search companies..."
          leftIcon="options-outline"
          onLeftIconPress={() => setIsFilterOpen(true)}
          rightButtonLabel="Search"
          onRightButtonPress={handleSearch}
        />

        {/* Stats */}
        <StatsRow />

        {/* Skeletons */}
        {isInitialLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {visibleCompanies.map((item) => (
              <CompanyCard key={item.id} item={item} />
            ))}

            {isLoadingMore && (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" />
              </View>
            )}

            {!hasMore && visibleCompanies.length > 0 && (
              <View className="py-4 items-center">
                <Text className="text-gray-500 text-base">
                  No more companies to load
                </Text>
              </View>
            )}

            {!visibleCompanies.length && (
              <View className="py-10 items-center">
                <Text className="text-gray-600 text-base">
                  No companies found with these filters.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterSheet
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        industries={industries}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
    </View>
  );
};

export default Companies;