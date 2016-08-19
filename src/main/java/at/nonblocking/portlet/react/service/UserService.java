package at.nonblocking.portlet.react.service;


import at.nonblocking.portlet.react.model.UserDetail;
import at.nonblocking.portlet.react.model.UserList;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;

public interface UserService {

    UserList getPortalUserList(int startIndex, int limit) throws SystemException;

    UserDetail getPortalUserDetail(long userId) throws SystemException, PortalException;

}
