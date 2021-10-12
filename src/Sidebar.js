import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography
} from '@material-ui/core';
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon,
    Columns as ColumnsIcon,
    Bell as BellIcon,
    Airplay as AirplayIcon,
    MessageSquare as MessageSquareIcon,
    Folder as FolderIcon,
    CreditCard as CreditCardIcon,
    File as FileIcon,
} from 'react-feather';
import NavItem from './NavItem';
import { useDispatch, useSelector } from 'react-redux';
import { avatarUrl } from "../../utils/Urls.js";
import { getMerchantInfoAction } from '../../reduxState/aciton/UserAction';
import { Skeleton } from '@material-ui/lab';
import useAxiosLoader from '../useAxiosLoader';

const LimitedMenu = [
    {
        href: '/admin',
        icon: BarChartIcon,
        title: 'Dashboard',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        href: '/admin/profile',
        icon: UserIcon,
        title: 'Profile',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        icon: ColumnsIcon,
        title: 'Apply For',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/apply-for-restaurant',
                title: "Restaurant",
                isShow: true,
            },
            {
                href: '/admin/apply-for-mart',
                title: "Mart",
                isShow: true,
            },
        ],
    },
    {
        icon: SettingsIcon,
        title: 'Settings',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/general-settings',
                title: "General",
                isShow: true,
            },
            {
                href: '/admin/approved-form-settings',
                title: "Approved Form",
                isShow: true,
            },
        ],
    },
];

const CompletedMenu = [
    {
        href: '/admin',
        icon: BarChartIcon,
        title: 'Dashboard',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        href: '/admin/notifications',
        icon: BellIcon,
        title: 'Notifications',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        href: '/admin/promote',
        icon: AirplayIcon,
        title: 'Promote',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        href: '/admin/message',
        icon: MessageSquareIcon,
        title: 'Message',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        href: '/admin/profile',
        icon: UserIcon,
        title: 'Profile',
        isOpen: false,
        isShow: true,
        child: [],
    },
    {
        icon: ColumnsIcon,
        title: 'Apply For',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/apply-for-restaurant',
                title: "Restaurant",
                isShow: true,
            },
            {
                href: '/admin/apply-for-mart',
                title: "Mart",
                isShow: true,
            },
        ],
    },
    {
        icon: ShoppingBagIcon,
        title: 'Shops',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/restaurant-shop',
                title: "Restaurant",
                isShow: true,
            },
            {
                href: '/admin/mart-shop',
                title: "Mart",
                isShow: true,
            },
        ],
    },
    {
        icon: FolderIcon,
        title: 'Order',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/all-orders',
                title: "All",
                isShow: true,
            },
            {
                href: '/admin/pickup-orders',
                title: "Pickup",
                isShow: true,
            },
            {
                href: '/admin/ready-orders',
                title: "Ready",
                isShow: true,
            },
            {
                href: '/admin/complete-orders',
                title: "Complete",
                isShow: true,
            },
            {
                href: '/admin/delivered-orders',
                title: "Delivered",
                isShow: true,
            },
        ],
    },
    {
        icon: CreditCardIcon,
        title: 'Finance',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/restaurant-finance',
                title: "Restaurant",
                isShow: true,
            },
            {
                href: '/admin/mart-finance',
                title: "Mart",
                isShow: true,
            },
            {
                href: '/admin/wallet',
                title: "Wallet",
                isShow: true,
            },
        ],
    },
    {
        icon: FileIcon,
        title: 'Reports',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/daily-reports',
                title: "Daily",
                isShow: true,
            },
        ],
    },
    {
        icon: SettingsIcon,
        title: 'Settings',
        isOpen: false,
        isShow: true,
        child: [
            {
                href: '/admin/general-settings',
                title: "General",
                isShow: true,
            },
            {
                href: '/admin/approved-form-settings',
                title: "Approved Form",
                isShow: true,
            },
        ],
    },
];

const DashboardSidebarSkeletonItem = () => (
    <Box display="flex" flexDirection="column" width={1} paddingX={2.5}>
        <Skeleton animation="wave" style={{ width: "100%", padding: 5 }} />
        <Skeleton animation="wave" style={{ width: "100%", padding: 5 }} />
        <Skeleton animation="wave" style={{ width: "100%", padding: 5 }} />
        <Skeleton animation="wave" style={{ width: "100%", padding: 5 }} />
    </Box>
);

const DashboardSidebar = ({ onMobileClose, openMobile }) => {

    const location = useLocation();

    const userinitialDetail = {
        firstName: "",
        lastName: "",
    };

    const [globalLoading] = useAxiosLoader();
    const [sidebarMenu, setSidebarMenu] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [userDetail, setUserDetail] = useState(userinitialDetail);

    const handleSidebarItemClick = (itemIndex) => {
        setSidebarMenu(
            sidebarMenu.map((item, index) =>
                index === itemIndex ? { ...item, isOpen: !item.isOpen } : item
            )
        );
    };

    const handleAllClose = (itemIndex) => {
        setSidebarMenu(
            sidebarMenu.map((item, index) =>
                index !== itemIndex ? { ...item, isOpen: false } : { ...item, isOpen: !item.isOpen }
            )
        );
    };

    // ********** Redux State **********
    const dispatch = useDispatch();
    const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
    const { merchantInformation, success: merchantInfoSuccess } = getMerchantInfo;

    const createRestaurant = useSelector((state) => state.createRestaurant);
    const { success: createRestauranrSuccess, error, loading } = createRestaurant;


    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: profileSuccess } = userUpdateProfile;


    const userUpdateAvatar = useSelector((state) => state.userUpdateAvatar);
    const { success: avatarSuccess } = userUpdateAvatar;

    // ********** useEffect **********
    useEffect(() => {
        dispatch(
            getMerchantInfoAction()
        )
    }, [avatarSuccess, profileSuccess, createRestauranrSuccess]);

    useEffect(() => {
        if (merchantInformation) {
            const { avatar, firstName, lastName } = merchantInformation.data.user;
            setUserAvatar(avatar)
            setUserDetail({
                ...userDetail,
                firstName,
                lastName,
            });
        }
    }, [merchantInformation]);

    useEffect(() => {
        if (merchantInformation) {
            const { approved, hasRestaurant, hasMart, RestaurantLifeCycle } = merchantInformation.data.user;
            if (approved && RestaurantLifeCycle === "Approved" && hasRestaurant) {
                const CompletedMenuChild = CompletedMenu.map(item => item.child);
                CompletedMenuChild[5][0].isShow = false;
                setSidebarMenu(CompletedMenu)
            } else {
                setSidebarMenu(LimitedMenu)
            }
        }
    }, [createRestauranrSuccess, merchantInformation]);

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                padding={2}
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Avatar
                    component={RouterLink}
                    src={`${avatarUrl}${userAvatar}`}
                    style={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                    to="/admin/profile"
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {userDetail.firstName} {userDetail.lastName}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Admin
                </Typography>
            </Box>
            <Divider />
            <Box padding={2}>
                {
                    // globalLoading
                    //     ?
                    //     <DashboardSidebarSkeletonItem />
                    //     :
                        <List>
                            {sidebarMenu?.map((item, index) => (
                                <NavItem
                                    itemIndex={index}
                                    href={item.href}
                                    key={item.title}
                                    title={item.title}
                                    icon={item.icon}
                                    child={item.child}
                                    isOpen={item.isOpen}
                                    isShow={item.isShow}
                                    handleSidebarItemClick={handleSidebarItemClick}
                                    handleAllClose={handleAllClose}
                                />
                            ))}
                        </List>
                }
            </Box>
            <Box style={{ flexGrow: 1 }} />
            <Box
                margin={2}
                padding={2}
                style={{
                    backgroundColor: 'background.default',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>
                        {"Copyright © "}
                        <Link color='inherit' path='https://arenthis.com/'>
                            Arenthis
            </Link>{" "}
                        {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        style: {
                            width: 280
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        style: {
                            width: 280,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
};

export default DashboardSidebar;