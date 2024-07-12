import BBContext from "./BBContext";

const BBState = (props) => {
    const host = "http://localhost:5000";
    let donorInitial = [];

    const [donors, setDonors] = useState(donorInitial)
    const [authenticationToken, setAuthenticationToken] = useState(null);

    const setAT = (AT) => {
        console.log("AT = " + AT);
        setAuthenticationToken(AT)
    }

    useEffect(() => {
        console.log("At in State = " + authenticationToken);
    }, [authenticationToken]);

    const isATvalid = () => {
        if (authenticationToken === null) {
            return false;
        }
        return true;
    }


    // fetch all donors
    const getDonors = async () => {
        // API CALL

        const response = await fetch(`${host}/api/donor/getDonorDetails`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "auth-token": authenticationToken
            },
        });
        const json = await response.json();
        setDonors(json);
    }

    return (
        <BBContext.Provider value={{ setAT, isATvalid }}>
            {props.children}
        </BBContext.Provider>
    )

}