import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Input, Button, Form } from 'antd';

import { loginRequestAction } from '../reducers/user';


const LoginForm = () => {
    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback(e => {
            setter(e.target.value);
        }, []);
        return [value, handler];
    };

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    const { isLoggingIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        dispatch(loginRequestAction);
    }, [id, password]);

    return (
        <Form
             onSubmit={onSubmitForm}
             style={{ padding: '10px' }}
             >
            <div>
                <label htmlFor="user-id">ID</label>
                <Input 
                    id="user-id" 
                    name="user-id"
                    value={id}
                    onChange={onChangeId}
                    required
                />
            </div>
            <div>
                <label htmlFor="user-id">비밀번호</label>
                <Input 
                    id="user-password" 
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                <Link href="/signup">
                    <a><Button>회원가입</Button></a>
                </Link>
            </div>
        </Form>
    );
};

export default LoginForm;