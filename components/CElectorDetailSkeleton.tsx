import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { View } from "react-native";
import colors from "@/constants/colors";

const CElectorSkeleton = () => (
    <View className="bg-white border border-gray-300 rounded-md p-2">
        <ContentLoader
            speed={2} // Controls the skeleton animation speed
            width="100%"
            height={400}
            backgroundColor={colors.secondary}
            foregroundColor="#ecebeb"
        >
            {/* Verified Badge */}
            <Rect x="300" y="10" rx="5" ry="5" width="70" height="12" />

            {/* Avatar */}
            <Circle cx="50" cy="60" r="40" />

            {/* Section Titles */}
            <Rect x="20" y="110" rx="5" ry="5" width="140" height="15" />
            <Rect x="20" y="130" rx="5" ry="5" width="260" height="12" />

            {/* Fullname */}
            <Rect x="20" y="160" rx="5" ry="5" width="360" height="20" />

            {/* Code Elector & No Registration */}
            <Rect x="20" y="190" rx="5" ry="5" width="150" height="15" />
            <Rect x="200" y="190" rx="5" ry="5" width="180" height="15" />

            {/* Gender & DOB */}
            <Rect x="20" y="220" rx="5" ry="5" width="150" height="15" />
            <Rect x="200" y="220" rx="5" ry="5" width="180" height="15" />

            {/* Regions */}
            <Rect x="20" y="250" rx="5" ry="5" width="360" height="15" />

            {/* Parent Names */}
            <Rect x="20" y="280" rx="5" ry="5" width="360" height="15" />
            <Rect x="20" y="305" rx="5" ry="5" width="360" height="15" />

            {/* Contact Info */}
            <Rect x="20" y="330" rx="5" ry="5" width="170" height="15" />
            <Rect x="200" y="330" rx="5" ry="5" width="180" height="15" />
        </ContentLoader>
    </View>
);

export default CElectorSkeleton;
