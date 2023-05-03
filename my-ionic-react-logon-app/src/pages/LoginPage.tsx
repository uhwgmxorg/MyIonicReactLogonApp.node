import {
    IonIcon,
    IonToast,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";

import { useAuth } from "../AuthContext";
import GetVersion from "../components/GetVersion";

import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

const eyeButtonStyle = {
    position: 'absolute',
    right: '-10px',
    top: '35%',
    transform: 'translateY(-50%)',
};

const LoginPage: React.FC = () => {
    const { logIn } = useAuth();

    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);


    const [showToastForWrongUser, setShowToastForWrongUser] = React.useState(false);
    const [showToastForWrongPassword, setShowToastForWrongPassword] = React.useState(false);
    const [showToastForRemovedChars, setShowToastForRemovedChars] = React.useState(false);

    const history = useHistory();


    function clearUpUserName(user: string): [string, boolean] {
        // Replace all underscores with hyphens
        const replacedUnderscores = user.replace(/_/g, '-');
        // Remove all characters except letters, numbers, underscores, hyphens, and periods
        const validCharsRegex = /[^a-zA-Z0-9_.-]/g;
        const cleanedUpUser = replacedUnderscores.replace(validCharsRegex, '');

        // Check if any characters were removed
        const removedChars = cleanedUpUser.length !== user.length;

        return [cleanedUpUser, removedChars];
    }

    const proceedWithLogin = async (cleanUser: string, password: string) => {
        await logIn(cleanUser, password);
        history.replace("/page/YouAreLogedon");
    };

    const doLogin = async () => {
        // Uncomment only recommend for debugging
        //console.log("process.env.REACT_APP_PASSWORD=" + process.env.REACT_APP_PASSWORD);
        //console.log("process.env.REACT_APP_ENV_VAR_01=" + process.env.REACT_APP_ENV_VAR_01);
        //console.log("UserName=" + user);
        var [cleanUser, removedChars] = clearUpUserName(user);
        setUser(cleanUser); // Update the user state with the cleaned up username
        console.log("removedChars=" + removedChars);
        let b = false;
        b = true; // If that is removed, AuthContext pulls line 46
        if (b) {
            if (cleanUser.length <= 2) {
                // Username is too short, show error message            
                console.log("cleanUser.length < 2");
                setShowToastForWrongUser(true);
                return;
            }
            if (password !== process.env.REACT_APP_PASSWORD) {
                // Wrong password
                console.log("Wrong password");
                setShowToastForWrongPassword(true);
                return;
            }

        }
        if (removedChars) {
            // Invalid characters
            console.log("user=" + user);
            console.log("cleanUser=" + cleanUser);
            setShowToastForRemovedChars(true);
            // Wait for the toast to be shown, then proceed with login
            setTimeout(async () => {
                proceedWithLogin(cleanUser, password);
            }, 2000);
            return;
        }

        await logIn(cleanUser, password);
        history.replace("/page/YouAreLogedon");
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonLabel style={{ padding: '10px', fontWeight: '600' }}>Please Login</IonLabel>
                    <GetVersion />
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

                    <IonCard style={{ width: "400px" }}>
                        <IonCardHeader>
                            <IonCardTitle>Hint</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonItem className='my-text-style2'>
                                Enter a username with more than 2 characters!
                            </IonItem>
                        </IonCardContent>
                    </IonCard>

                    <IonCard style={{ maxWidth: "400px" }}>
                        <IonCardHeader>
                            <IonCardTitle>Logon</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonItem>
                                <IonLabel>User</IonLabel>
                                <IonInput label="User" style={{ marginLeft: '8px' }} placeholder="user"
                                    onIonChange={(e) => setUser(e.detail.value as string)}
                                ></IonInput>

                                <IonLabel style={{ marginLeft: '10px' }}>Password</IonLabel>
                                <IonInput
                                    label="Password"
                                    style={{ marginLeft: '8px', marginRight: '8px', position: 'relative' }}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                >
                                </IonInput>
                                <IonButton
                                    fill="clear"
                                    slot="end"
                                    onClick={toggleShowPassword}
                                    style={eyeButtonStyle}
                                >
                                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} />
                                </IonButton>
                            </IonItem>
                            <IonButton className='my-login-button-input-style' onClick={() => doLogin()}>Submit</IonButton>
                        </IonCardContent>
                    </IonCard>
                </div>
                <IonToast isOpen={showToastForWrongUser} onDidDismiss={() => setShowToastForWrongUser(false)} message="The username must be longer than 2 characters!!" duration={2000} color="danger" cssClass="my-toast" />
                <IonToast isOpen={showToastForWrongPassword} onDidDismiss={() => setShowToastForWrongPassword(false)} message="Wrong Password!!" duration={2000} color="danger" cssClass="my-toast" />
                <IonToast isOpen={showToastForRemovedChars} onDidDismiss={() => setShowToastForRemovedChars(false)} message="Invalid characters have been removed!" duration={2000} color="warning" cssClass="my-toast" />
            </IonContent>

        </IonPage>
    );
};

export default LoginPage;
