import {Image, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {dataAPI} from "@/api/internal";

const CSignature = ({byNo=null, isAR=false, byReg=false, borderClass = "border-gray-300", labelTextClass = "text-gray-500"}) => {
    const [avatarUri, setAvatarUri] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchSignBase64 } = dataAPI;

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const params = { kodeElektor: byNo };
                let setURLBy = "byelector2014"

                if (isAR){
                   setURLBy = "byelector"
                } else {
                    if (byReg){
                        setURLBy = "byreg"
                    }
                }

                const response = await fetchSignBase64(params, setURLBy);

                let newAvatarUri = "";
                if (response?.data?.sign) {
                    newAvatarUri = `data:image/png;base64,${response.data.sign}`;
                }

                setAvatarUri(newAvatarUri);
            } catch (error) {
                console.error("Error fetching avatar:", error);
                setAvatarUri("");
            } finally {
                setLoading(false);
            }
        };

        loadAvatar();
    }, [byNo, isAR, byReg]);

	return (
		<>
        <View className={`border h-36 ${borderClass} rounded-md px-1 py-2 w-[40%] items-center justify-center relative`}>
            <Text className={`text-sm ${labelTextClass} absolute -top-3 left-2 bg-white px-1`}>
                Signature
            </Text>
            <Image
              key={avatarUri}
              source={{ uri: avatarUri }}
              className="rounded-md w-full h-full"
              resizeMode="contain"
            />
        </View>
    </>
	)
}

export default CSignature;