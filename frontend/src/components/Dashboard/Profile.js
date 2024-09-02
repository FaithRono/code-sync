import React, { useState } from 'react';
import styled from 'styled-components';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: 'JohnDoe',
        bio: 'Software engineer with a passion for building web applications.',
        profilePicture: 'https://via.placeholder.com/150'
    });

    const [editedUser, setEditedUser] = useState({ ...user });
    const [image, setImage] = useState(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setEditedUser((prev) => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfilePicture src={user.profilePicture} alt="Profile" />
                {isEditing ? (
                    <>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <Input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </>
                ) : (
                    <ProfileName>{user.username}</ProfileName>
                )}
            </ProfileHeader>
            <ProfileContent>
                {isEditing ? (
                    <>
                        <Textarea
                            name="bio"
                            value={editedUser.bio}
                            onChange={handleChange}
                            placeholder="Bio"
                            rows="4"
                        />
                        <ButtonGroup>
                            <Button onClick={handleSave}>Save</Button>
                            <Button onClick={handleCancel} secondary>Cancel</Button>
                        </ButtonGroup>
                    </>
                ) : (
                    <>
                        <ProfileField><strong>Bio:</strong> {user.bio}</ProfileField>
                        <Button onClick={handleEdit}>Edit Profile</Button>
                    </>
                )}
            </ProfileContent>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
`;

const ProfileName = styled.h1`
    font-size: 2rem;
    margin: 0;
`;

const ProfileContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfileField = styled.div`
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${(props) => (props.secondary ? '#6c757d' : '#007bff')};
    color: #ffffff;

    &:hover {
        background-color: ${(props) => (props.secondary ? '#5a6268' : '#0056b3')};
    }
`;

export default ProfilePage;
