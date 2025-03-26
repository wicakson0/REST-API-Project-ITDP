import { useState } from "react";
import axios from "axios";

const Informasi = () => {
  const [balanceData, setBalanceData] = useState(null);

  const fetchBalance = async () => {
    try {
      // Signature Auth: https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/utilities/signature-auth
      const signatureResponse = await axios.post(
        "https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/utilities/signature-auth",
        {},
        {
          headers: {
            accept: "application/json",
            "X-TIMESTAMP": "2020-01-01T00:00:00+07:00",
            "X-CLIENT-KEY": "5d8e726baee5466db2ee5433356a423c",
            Private_Key: "wkeCulf8W9/pV2p8G69UUkyr9+IY5z6jPIZDBGsPZGc=",
          },
        }
      );

      const xSignatureAuth = signatureResponse.data.signature;
      console.log("Signature Auth:" + xSignatureAuth);

      // Access Token: https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/access-token/b2b
      const accessTokenResponse = await axios.post(
        "https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/access-token/b2b",
        { grantType: "client_credentials", additionalInfo: {} },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-TIMESTAMP": "2020-01-01T00:00:00+07:00",
            "X-CLIENT-KEY": "5d8e726baee5466db2ee5433356a423c",
            "X-SIGNATURE": xSignatureAuth,
          },
        }
      );

      const accessToken = accessTokenResponse.data.accessToken;
      console.log("Access Token:" + accessToken);

      // Signature: https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/utilities/signature-service
      const balanceSignatureResponse = await axios.post(
        "https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/utilities/signature-service",
        {
          partnerReferenceNo: "2020102900000000000001",
          bankCardToken: "6d7963617264746f6b656e",
          accountNo: "2000100101",
          balanceTypes: ["Cash", "Coins"],
          additionalInfo: {
            deviceId: "12345679237",
            channel: "mobilephone",
          },
        },
        {
          headers: {
            accept: "application/json",
            "X-TIMESTAMP": "2020-01-01T00:00:00+07:00",
            "X-CLIENT-SECRET": "G9+wvUZga2WPCTNyzGMzGBrg69dMFsBvWpgrIYZMqhM=",
            HttpMethod: "POST",
            EndpoinUrl: "/api/v1.0/balance-inquiry",
            AccessToken: accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const xSignatureBalance = balanceSignatureResponse.data.signature;
      console.log("Signature Balance:" + xSignatureBalance);

      // Informasi Saldo: https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/balance-inquiry
      const balanceResponse = await axios.post(
        "https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/balance-inquiry",
        {
          partnerReferenceNo: "2020102900000000000001",
          bankCardToken: "6d7963617264746f6b656e",
          accountNo: "2000100101",
          balanceTypes: ["Cash", "Coins"],
          additionalInfo: {
            deviceId: "12345679237",
            channel: "mobilephone",
          },
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-TIMESTAMP": "2020-01-01T00:00:00+07:00",
            "X-SIGNATURE": xSignatureBalance,
            "X-PARTNER-ID": "5d8e726baee5466db2ee5433356a423c",
            "X-EXTERNAL-ID": "41807553358950093184162180797837",
            "CHANNEL-ID": "95221",
          },
        }
      );

      setBalanceData(balanceResponse.data);
      console.log(balanceResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Balance Information */}
      <div style={{ textAlign: "center" }}>
        <h1>Informasi Saldo</h1>
        <p>
          <strong>Nama:</strong> {balanceData ? balanceData.name : ""}
        </p>
        <p>
          <strong>Account No:</strong>{" "}
          {balanceData ? balanceData.accountNo : ""}
        </p>
        <p>
          <strong>Partner Reference No:</strong>{" "}
          {balanceData ? balanceData.partnerReferenceNo : ""}
        </p>
      </div>

      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <button
          onClick={fetchBalance}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Check Saldo
        </button>
      </div>

      <hr />

      {balanceData &&
        balanceData.accountInfos?.map((account, index) => (
          <div key={index} style={{ marginTop: "20px", textAlign: "left" }}>
            <p>
              <strong>Balance Type:</strong> {account.balanceType}
            </p>
            <p>
              <strong>Status:</strong> 0001
            </p>
            <p>
              <strong>Reg Status Code:</strong> 0001
            </p>
            <table
              border="1"
              width="100%"
              style={{ borderCollapse: "collapse", marginTop: "10px" }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th>#</th>
                  <th>Account Infos</th>
                  <th>Value</th>
                  <th>Currency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Amount", value: account.amount },
                  { label: "Float Amount", value: account.floatAmount },
                  { label: "Hold Amount", value: account.holdAmount },
                  {
                    label: "Available Balance",
                    value: account.availableBalance,
                  },
                  { label: "Ledger Balance", value: account.ledgerBalance },
                  {
                    label: "Current Multilateral Limit",
                    value: account.currentMultilateralLimit,
                  },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.label}</td>
                    <td>{item.value?.value || "N/A"}</td>
                    <td>{item.value?.currency || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default Informasi;
