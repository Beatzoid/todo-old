import React from "react";
import useSWR from "swr";

import { Box, Text } from "@/utils/theme";
import { fetcher } from "@/services/config";

const HomeScreen = () => {
    const { data, isLoading } = useSWR("categories", fetcher);

    console.log(data);

    return (
        <Box>
            <Text>Home</Text>
        </Box>
    );
};

export default HomeScreen;
