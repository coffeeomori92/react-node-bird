import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Input, Button, Form } from 'antd';

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

    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        console.log({
            id, password
        })
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
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup">
                    <a><Button>회원가입</Button></a>
                </Link>
            </div>
        </Form>
    );
};

export default LoginForm;