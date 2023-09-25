import { RecoilRoot, RecoilRootProps } from "recoil"

const RecoilProvider: React.FC<RecoilRootProps> = ({ children, ...props }) => {
	return <RecoilRoot {...props}>{children}</RecoilRoot>
}

export default RecoilProvider
