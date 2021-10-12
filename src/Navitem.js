import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import {
    ChevronRight as ChevronRightIcon,
    ChevronDown as ChevronDownIcon
} from 'react-feather';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    listItemRoot: {
        display: 'flex',
        paddingTop: "0px !important",
        paddingBottom: "0px !important",
    },

    itemBtn: {
        color: 'text.secondary',
        fontWeight: 'medium',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        paddingTop: "10px !important",
        paddingBottom: "10px !important",
        textTransform: 'none',
        width: '100%',
    },

    nestedItem: {
        display: 'flex',
        paddingTop: "0px !important",
        paddingBottom: "0px !important",
    },

    nestedItemBtn: {
        color: 'text.secondary',
        fontWeight: 'medium',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        padding: "10px 32px !important",
        textTransform: 'none',
        width: '100%',
    },

}));

const NavItem = ({ itemIndex, href, icon: Icon, title, isOpen, isShow, child, handleSidebarItemClick, handleAllClose, ...rest }) => {

    const classes = useStyles();

    return (
        <>
            {isShow &&
                <>
                    {child && child.length > 0
                        ?
                        <>
                            <ListItem
                                className={classes.listItemRoot}
                                disableGutters
                                {...rest}
                                onClick={() => {
                                    handleSidebarItemClick(itemIndex);
                                    handleAllClose(itemIndex);
                                }}
                            >
                                <Button className={classes.itemBtn}>
                                    {Icon && (
                                        <Box display="flex" justifyContent="center" alignItems="center" marginRight={1}>
                                            <Icon size="20" />
                                        </Box>
                                    )}
                                    <div style={{ width: '100%' }}>
                                        <Box display="flex">
                                            <Box display="flex" alignItems="center" flexGrow={1}>
                                                <span>
                                                    {title}
                                                </span>
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                {isOpen ? (
                                                    <ChevronDownIcon size="18" />
                                                ) : (
                                                    <ChevronRightIcon size="18" />
                                                )}
                                            </Box>
                                        </Box>
                                    </div>
                                </Button>
                            </ListItem>
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                {child?.map((item, index) => (
                                    <div key={index}>
                                        {
                                            item.isShow
                                            &&
                                            <ListItem
                                                disableGutters
                                                className={classes.nestedItem}
                                                {...rest}
                                            >
                                                <Button
                                                    component={RouterLink}
                                                    className={classes.nestedItemBtn}
                                                    to={item.href}
                                                >
                                                    <span>
                                                        {item.title}
                                                    </span>
                                                </Button>
                                            </ListItem>
                                        }
                                    </div>
                                ))}
                            </Collapse>
                        </>
                        :
                        <>
                            <ListItem
                                disableGutters
                                className={classes.listItemRoot}
                                {...rest}
                                onClick={() => {
                                    handleAllClose(itemIndex);
                                }}
                            >
                                <Button
                                    component={RouterLink}
                                    className={classes.itemBtn}
                                    to={href}
                                >
                                    {Icon && (
                                        <Box display="flex" justifyContent="center" alignItems="center" marginRight={1}>
                                            <Icon size="20" />
                                        </Box>
                                    )}
                                    <span>
                                        {title}
                                    </span>
                                </Button>
                            </ListItem>
                        </>
                    }
                </>
            }
        </>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string
};

export default NavItem;