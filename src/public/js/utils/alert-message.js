const createAlertMessage = (message, isDanger) => {
    document.cookie = `alertMessage=${JSON.stringify({
        message,
        isDanger
    })};max-age=5`;

    console.log("Alert message created");
};

export const closeAlert = () => {
    document.cookie = "alertMessage=;max-age=0";
};

export default createAlertMessage;