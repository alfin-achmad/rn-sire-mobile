import AsyncStorage from "@react-native-async-storage/async-storage";
import {ScrollView, Text, TouchableOpacity, View, Alert, Modal, Pressable} from "react-native";
import {Avatar, Button, List, RadioButton} from "react-native-paper";
import colors from "@/constants/colors";
import {useAuth} from "@/queries/useAuth";
import {useState} from "react";
import {router} from "expo-router";
import {generateAvatarInitialName} from "@/helpers/general";

const AccountScreen = () => {
	const {signOut, user} = useAuth();
	const [languageModalVisible, setLanguageModalVisible] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState("EN");

	const handleAction = {
		onClickSignOut: () => {
			Alert.alert(
				"Sign Out",
				"Are you sure you want to sign out?",
				[
					{
						text: "Cancel",
						style: "cancel"
					},
					{
						text: "Yes",
						style: "destructive",
						onPress: () => {
							signOut();
						}
					}
				],
				{ cancelable: true }
			);
		},
		onClickSelectLanguage: () => {
			setLanguageModalVisible(true)
		},
		onClickSelectLiveSupport: async () => {
			await AsyncStorage.setItem('tabState', 'chat')
			router.push('/inbox?tab=chat');
		},
		onSelectLanguage: (value) => {
			setSelectedLanguage(value)
			setLanguageModalVisible(false)
		},
		onPress: async () => {
			try {
				await AsyncStorage.clear();
				console.log("Storage cleared!");
			} catch (error) {
				console.error("Error clearing storage:", error);
			}
		}
	}

	const ViewSelectLanguage = () => {
		return (
			<>
				<View style={{ justifyContent: "center" }} className="text-end">
					<Text style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>
						{selectedLanguage}
					</Text>
				</View>
			</>
		)
	}

	const ViewRightItem = ({value}) => {
		return (
			<>
				<View style={{ justifyContent: "center" }} className="text-end">
					<Text style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>
						{value}
					</Text>
				</View>
			</>
		)
	}

	return (
		<>
			<ScrollView contentContainerStyle={{padding: 12}}>
				<View className="flex-1 justify-center">
					<View className="items-center mt-2">
						<Avatar.Text label={generateAvatarInitialName(user?.nama)} size={64} style={{backgroundColor: colors.secondary}} />
						<Text className="mt-2 text-lg" style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>{user?.nama || "-"}</Text>
						<Text className="text-gray-500" style={{fontFamily: "IBMPlexSans", color: colors.secondary}}>
							{user?.kode_user}, {(user?.role)?.toUpperCase()} - {user?.nama_distrik || 'ALL'}
						</Text>
					</View>
					<View className="mt-1">
						<List.Section className="mb-0">
							<List.Subheader style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary, paddingHorizontal: 10, paddingVertical: 5}}>My Account</List.Subheader>
							<View className="bg-white border border-gray-300 rounded-md px-3">
								<List.Item title="Detail Profile" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="account-details" color={colors.secondary} />} onPress={() => console.log("Ubah Profil")} />
								<List.Item title="Change Profile" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="account-edit" color={colors.secondary}/>} onPress={() => console.log("Ubah Profil")} />
								<List.Item title="Verfication Account" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="check-decagram" color={colors.secondary}/>} onPress={() => console.log("Ubah Profil")} />
							</View>
						</List.Section>

						<List.Section className="mb-0">
							<List.Subheader style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary, paddingHorizontal: 10, paddingVertical: 5}}>Setting</List.Subheader>
							<View className="bg-white border border-gray-300 rounded-md px-3">
								<List.Item title="Change Password" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="lock" color={colors.secondary}/>} onPress={() => console.log("Ubah Profil")} />
								<List.Item title="Select Language" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="translate" color={colors.secondary} />} right={() => <ViewRightItem value={selectedLanguage} />} onPress={() => handleAction.onClickSelectLanguage()} />
								<List.Item
									title="Clear Cache"
									style={{paddingVertical: 0}}
									titleStyle={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}
									left={() => <List.Icon icon="delete-sweep" color={colors.secondary} />}
									right={() => <ViewRightItem value="10KB" />}
									onPress={() => console.log("Clear Cache")}
								/>
							</View>
						</List.Section>

						<List.Section>
							<List.Subheader style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary, paddingHorizontal: 10, paddingVertical: 5}}>Help & Support</List.Subheader>
							<View className="bg-white border border-gray-300 rounded-md px-3">
							<List.Item title="FAQ" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="help-circle" color={colors.secondary}/>} onPress={() => console.log("Ubah Profil")} />
							<List.Item title="Live Support" style={{paddingVertical: 0}} titleStyle={{color: colors.secondary, fontFamily: "IBMPlexSans"}} left={() => <List.Icon icon="chat" color={colors.secondary}/>} onPress={() => handleAction.onClickSelectLiveSupport()} />
							</View>
						</List.Section>

						<TouchableOpacity
							onPress={() => handleAction.onClickSignOut()}
							className="mt-0 p-2 rounded-md items-center"
							style={{backgroundColor: colors.secondary}}
						>
							<Text className="text-lg" style={{fontFamily: "IBMPlexSans_Bold", color: "#FFF"}}>Sign Out</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			<Modal
				visible={languageModalVisible}
				transparent
				animationType="slide"
				onRequestClose={() => setLanguageModalVisible(false)}
			>
				<Pressable
					style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
					onPress={() => setLanguageModalVisible(false)}
				>
					<View
						style={{
							marginTop: "auto",
							backgroundColor: "white",
							padding: 16,
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
						}}
						onStartShouldSetResponder={() => true}
					>
						<Text style={{ fontFamily: "IBMPlexSans_Bold", color: colors.secondary, fontSize: 16, marginBottom: 10 }}>
							Select Language
						</Text>

						<RadioButton.Group
							onValueChange={(value) => handleAction.onSelectLanguage(value)}
							value={selectedLanguage}
						>
							{[
								{ value: "EN", label: "English" },
								{ value: "ID", label: "Bahasa" },
								{ value: "TT", label: "Tetun Timor" },
								{ value: "PT", label: "Portugis" },
							].map((lang) => (
								<View key={lang.value} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
									<RadioButton value={lang.value} color={colors.secondary}/>
									<Text style={{ fontFamily: "IBMPlexSans", color: colors.secondary }}>{lang.label}</Text>
								</View>
							))}
						</RadioButton.Group>
					</View>
				</Pressable>
			</Modal>
		</>
	)
}

export default AccountScreen