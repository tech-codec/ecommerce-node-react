import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordUser } from "../../actions/userAction/user.action";

const UpdatePassword = () => {
    const auth = useSelector((state) => state.auth);
    const { user } = auth;
    const userDataState = useSelector((state) => state.user);
    const { error } = userDataState;
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePasswordUser(user._id, { password, newPassword, confirmPassword }));
    };

    return (
        <div className="w-full p-4 lg:p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Changer le mot de passe</h2>
            <div className="flex items-center justify-center">
                <div className="bg-white p-4 lg:p-8 rounded-lg shadow-lg w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { label: "Mot de passe actuel", value: password, setValue: setPassword, show: showPassword, setShow: setShowPassword, error: error?.passwordError },
                            { label: "Nouveau mot de passe", value: newPassword, setValue: setNewPassword, show: showNewPassword, setShow: setShowNewPassword, error: error?.newPasswordLength },
                            { label: "Confirmer le nouveau mot de passe", value: confirmPassword, setValue: setConfirmPassword, show: showConfirmPassword, setShow: setShowConfirmPassword, error: error?.confirmPasswordError }
                        ].map((field, index) => (
                            <div key={index}>
                                <label className="block mb-2 text-gray-700">{field.label}</label>
                                <div className="relative">
                                    <input
                                        type={field.show ? "text" : "password"}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        value={field.value}
                                        onChange={(e) => field.setValue(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-all"
                                        onClick={() => field.setShow(!field.show)}
                                    >
                                        {field.show ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </button>
                                </div>
                                {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full p-3 text-white font-semibold bg-orange-500 hover:bg-orange-400 rounded-lg transition-all"
                        >
                            Modifier le mot de passe
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default UpdatePassword;
