import {Image, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {dataAPI} from "@/api/internal";

const CFinger = ({
                     byNo = null,
                     isAR = false,
                     byReg = false,
                     borderClass = "border-gray-300",
                     labelTextClass = "text-gray-500",
                 }) => {
    const [avatarUri1, setAvatarUri1] = useState(null);
    const [avatarUri2, setAvatarUri2] = useState(null);
    const [textAvatarUri1, setTextAvatarUri1] = useState(null);
    const [textAvatarUri2, setTextAvatarUri2] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchFingerBase64 } = dataAPI;

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const params = { kodeElektor: byNo };
                let setURLBy = "byelector2014";

                if (isAR) {
                    setURLBy = "byelector";
                } else {
                    if (byReg) {
                        setURLBy = "byreg";
                    }
                }

                const response = await fetchFingerBase64(params, setURLBy);

                let newAvatarUri1 = "",
                  newAvatarUri2 = "",
                  newTextAvatarUri1 = "Finger 1",
                  newTextAvatarUri2 = "Finger 2";
                if (response?.data?.length > 0) {
                    newAvatarUri1 = `data:image/png;base64,${response.data[0]?.finger}`;
                    newAvatarUri2 = `data:image/png;base64,${response.data[1]?.finger}`;
                    newTextAvatarUri1 = response.data[0]?.indexFinger?.trim()
                      ? response.data[0].indexFinger
                      : "Finger 1";
                    newTextAvatarUri2 = response.data[1]?.indexFinger?.trim()
                      ? response.data[1].indexFinger
                      : "Finger 2";
                }

                setAvatarUri1(newAvatarUri1);
                setAvatarUri2(newAvatarUri2);
                setTextAvatarUri1(newTextAvatarUri1);
                setTextAvatarUri2(newTextAvatarUri2);
            } catch (error) {
                console.error("Error fetching finger:", error);
                setAvatarUri1("");
            } finally {
                setLoading(false);
            }
        };

        loadAvatar();
    }, [byNo, isAR, byReg]);

    return (
      <>
          <View
            className={`border h-36 rounded-md px-1 py-2 w-[28%] relative ${borderClass}`}
          >
              <Text
                className={`text-sm absolute -top-3 left-2 bg-white px-1 ${labelTextClass}`}
              >
                  {textAvatarUri1}
              </Text>
              <Image
                key={avatarUri1}
                source={{ uri: avatarUri1 }}
                className="rounded-md h-full w-full"
                resizeMode="contain"
              />
          </View>

          <View
            className={`border h-36 rounded-md px-1 py-2 w-[28%] relative ${borderClass}`}
          >
              <Text
                className={`text-sm absolute -top-3 left-2 bg-white px-1 ${labelTextClass}`}
              >
                  {textAvatarUri2}
              </Text>
              <Image
                key={avatarUri2}
                source={{ uri: avatarUri2 }}
                className="rounded-md h-full w-full"
                resizeMode="contain"
              />
          </View>
      </>
    );
};

export default CFinger;