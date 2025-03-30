import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import CAvatar from "@/components/CAvatar";
import colors from "@/constants/colors";
import {useAuth} from "@/queries/useAuth";
import {useEffect, useState} from "react";
import {Dialog, Portal} from "react-native-paper";
import useElector from "@/queries/useElector";
import {Ionicons} from "@expo/vector-icons";
import {APP_ROUTES} from "@/constants/urls";
import CElectorDetail from "@/components/CElectorDetail";

const ElectorDoubleDetail = () => {
    const {user} = useAuth();
    const {processVerifyElector, updateParam, fetchFindDoubleElector, isLoading, data, params, resetParams, resetFindElectorDoubleByID} = useElector();
    const [verifyDialog, setVerifyDialog] = useState(false);
    const {id, fromScreen, historySearchText, keyParam} = useLocalSearchParams();
    const electorByID = data?.findElectorDoubleID?.rows[0]

    useEffect(() => {
        resetFindElectorDoubleByID()
        if (id){
            updateParam("findDoubleElectorRegister", "prkdelektor", id)
            fetchFindDoubleElector(true, true)
        }
    }, [id]);

    const handleAction = {
        onBack: () => {
            resetFindElectorDoubleByID()
            router.back();
        },
        onPressVerify: () => {
            updateParam("verifyElectorRegister", "noPendaftaran", electorByID?.NO_PENDAFTARAN);
            updateParam("verifyElectorRegister", "urut", electorByID?.URUT);
            updateParam("verifyElectorRegister", "prioritas", user?.tingkatan);
            updateParam("verifyElectorRegister", "prkodeUser", user?.kode_user);

            processVerifyElector();
        },
        onPressCancel: () => {
            setVerifyDialog(true);
        }
    }
    console.log(data)
    return (
        <>
            <View className="flex-1 bg-gray-100">
                <CTopHeaderSubMenu title={`Detail Elector #${id}`} handlePress={handleAction.onBack} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="px-4 py-2">
                        {isLoading ? (
                            <ActivityIndicator />
                        ):(
                            <CElectorDetail dataElectorDetail={electorByID} />
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default ElectorDoubleDetail;