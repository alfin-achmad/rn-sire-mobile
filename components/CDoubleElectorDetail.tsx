import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import CAvatar from "@/components/CAvatar";
import CFinger from "@/components/CFinger";
import CSignature from "@/components/CSignature";

const CDoubleElectorDetail = ({ dataElectorDetail }) => {
    const elector = dataElectorDetail;
    const [selectedType, setSelectedType] = useState<"double" | "valid" | null>(null);

    const showDouble = selectedType === null || selectedType === "double";
    const showValid = selectedType === null || selectedType === "valid";

    return (
      <View className="bg-white border border-gray-300 rounded-md p-2">
          {/* Photo Section */}
          <View className="relative mb-2 w-full items-center">
              {/* Show All Button */}
              {selectedType !== null && (
                <TouchableOpacity
                  onPress={() => setSelectedType(null)}
                  className="absolute right-0 top-0 px-3 py-1 rounded-md border border-blue-950 z-10"
                  style={{ backgroundColor: colors.secondary }}
                >
                    <Text className="text-sm text-white" style={{ fontFamily: "IBMPlexSans" }}>
                        Show All
                    </Text>
                </TouchableOpacity>
              )}

              {/* Photo Section */}
              <View className="flex-row justify-center items-center w-full mt-0">
                  {showDouble && (
                    <TouchableOpacity
                      className="w-1/3 items-center justify-center"
                      onPress={() => setSelectedType("double")}
                    >
                        <CAvatar
                          width={90}
                          height={124}
                          no={elector?.NO_PENDAFTARAN}
                          name={elector?.NAMA}
                          urlBy="byreg"
                          borderClass="border-red-300"
                        />
                        <Text
                          className="text-sm text-red-500 ml-2"
                          style={{ fontFamily: "IBMPlexSans" }}
                        >
                            {elector?.KODE_ELEKTOR}
                        </Text>
                        {selectedType === null && (
                          <Text
                            className="text-xs text-red-500 mt-0"
                            style={{ fontFamily: "IBMPlexSans" }}
                          >
                              Double
                          </Text>
                        )}
                    </TouchableOpacity>
                  )}
                  {showValid && (
                    <TouchableOpacity
                      className="w-1/3 items-center justify-center"
                      onPress={() => setSelectedType("valid")}
                    >
                        <CAvatar
                          width={90}
                          height={124}
                          no={elector?.NO_PENDAFTARAN2}
                          name={elector?.NAMA2}
                          urlBy="byreg"
                          borderClass="border-blue-500"
                        />
                        <Text
                          className="text-sm ml-2"
                          style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}
                        >
                            {elector?.KODE_ELEKTOR2}
                        </Text>
                        {selectedType === null && (
                          <Text
                            className="text-xs mt-0"
                            style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}
                          >
                              Valid
                          </Text>
                        )}
                    </TouchableOpacity>
                  )}
              </View>
          </View>

          {/* Basic Info Section */}
          <View className="mt-2">
              <Text className="mb-0" style={{ fontFamily: "IBMPlexSans_Bold", fontSize: 14, color: colors.secondary }}>
                  Basic Information
              </Text>
              <Text className="mb-5 text-gray-500 text-sm" style={{ fontFamily: "IBMPlexSans" }}>
                  Details about the elector’s registration and identity.
              </Text>

              {/* Fullname */}
              <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                  <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Fullname</Text>
                  {showDouble && (
                    <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.NAMA}</Text>
                  )}
                  {showValid && (
                    <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.NAMA2}</Text>
                  )}
              </View>

              {/* Registration Number */}
              <View className="flex flex-row mb-3 gap-x-3">
                  <View className="border border-gray-300 rounded-md px-1 py-2 w-full">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">No. Registration</Text>
                      {showDouble && (
                        <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.NO_PENDAFTARAN}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.NO_PENDAFTARAN2}</Text>
                      )}
                  </View>
              </View>

              {/* Regions */}
              <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                  <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Regions</Text>
                  {showDouble && (
                    <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>
                        {elector?.NMDISTRIK} → {elector?.NMSUBDISTRIK} → {elector?.NMSUKO} → {elector?.NMALDEIA}
                    </Text>
                  )}
                  {showValid && (
                    <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>
                        {elector?.NMDISTRIK2} → {elector?.NMSUBDISTRIK2} → {elector?.NMSUKO2} → {elector?.NMALDEIA2}
                    </Text>
                  )}
              </View>

              {/* Phone & Email */}
              <View className="flex flex-row mb-3 gap-x-3">
                  <View className="border border-gray-300 rounded-md px-1 py-2 w-[50%]">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Phone Number</Text>
                      {showDouble && (
                        <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.HANDPHONE || "-"}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.HANDPHONE2 || "-"}</Text>
                      )}
                  </View>
                  <View className="border border-gray-300 rounded-md px-1 py-2 w-[47%]">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">E-Mail</Text>
                      {showDouble && (
                        <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.EMAIL || "-"}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.EMAIL2 || "-"}</Text>
                      )}
                  </View>
              </View>

              <Text className="mb-0" style={{ fontFamily: "IBMPlexSans_Bold", fontSize: 14, color: colors.secondary }}>
                  Documents
              </Text>
              <Text className="mb-5 text-gray-500 text-sm" style={{ fontFamily: "IBMPlexSans" }}>
                  Documents submitted during the registration process.
              </Text>

              <View className="flex flex-row mb-0 gap-x-3">
                  <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-[50%]">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Document Type</Text>
                      {showDouble && (
                        <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_ELEKTOR}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_ELEKTOR2}</Text>
                      )}
                  </View>

                  <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-[47%]">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">No. Document</Text>
                      {showDouble && (
                        <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_NO || "-"}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_NO2 || "-"}</Text>
                      )}
                  </View>
              </View>

              <View className="flex flex-row mb-0 gap-x-3">
                  <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-[50%]">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Date of Issued</Text>
                      {showDouble && (
                        <Text className="text-sm text-gray-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_ELEKTOR || "-"}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_ELEKTOR2 || "-"}</Text>
                      )}
                  </View>

                  <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-[47%]">
                      <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Date of Expired</Text>
                      {showDouble && (
                        <Text className="text-sm text-gray-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_TANGGAL || "-"}</Text>
                      )}
                      {showValid && (
                        <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_TANGGAL2 || "-"}</Text>
                      )}
                  </View>
              </View>

              <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                  <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">Officer Name</Text>
                  {showDouble && (
                    <Text className="text-sm text-red-500 ml-2" style={{ fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_NAMA || "-"}</Text>
                  )}
                  {showValid && (
                    <Text className="text-sm ml-2" style={{ color: colors.secondary, fontFamily: "IBMPlexSans" }}>{elector?.IDENTITAS_NAMA2 || "-"}</Text>
                  )}
              </View>

              {/* Biometrics */}
              <Text className="mb-0" style={{ fontFamily: "IBMPlexSans_Bold", fontSize: 14, color: colors.secondary }}>
                  Biometrics
              </Text>
              <Text className="mb-5 text-gray-500 text-sm" style={{ fontFamily: "IBMPlexSans" }}>
                  Biometric data includes left & right fingerprints and autograph for identity verification.
              </Text>

              {showDouble && (
                <View className="flex flex-row mb-3 gap-2">
                    <CFinger isAR={true} byNo={elector?.KODE_ELEKTOR} borderClass="border-red-500" labelTextClass="text-red-500" />
                    <CSignature isAR={true} byNo={elector?.KODE_ELEKTOR} borderClass="border-red-500" labelTextClass="text-red-500" />
                </View>
              )}
              {showValid && (
                <View className="flex flex-row mb-3 gap-2">
                    <CFinger isAR={true} byNo={elector?.KODE_ELEKTOR2} borderClass="border-blue-500" labelTextClass="text-blue-500" />
                    <CSignature isAR={true} byNo={elector?.KODE_ELEKTOR2} borderClass="border-blue-500" labelTextClass="text-blue-500" />
                </View>
              )}
          </View>
      </View>
    );
};

export default CDoubleElectorDetail;
