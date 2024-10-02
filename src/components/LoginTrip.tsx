interface LoginTripProps {
    location: string;
    left: string;
    bottom: string;
    opacity?: string
}

const LoginTrip: React.FC<LoginTripProps> = ({location, left, bottom}) => {

    return (
        <div className="Login-trips" style={{left: left, bottom: bottom}}>
            <p className="font-medium">{location}</p>
        </div>
    )
}

export default LoginTrip;