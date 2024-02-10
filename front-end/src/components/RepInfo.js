import React, { useState } from 'react';
import fetchRepData from '../api/fetchRepData';
import AddressForm from './AddressForm';
import Profile from './Profile';
import Finances from './Finances';
import SponsoredBills from './Bills';
import Statements from './Statements';
import News from './News';
import VotingInfo from './Voting';

function RepInfo() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        representativeInfo: {},
        repContribData: {},
        proPublicaInfo: {},
        repContribSummary: {},
        repSponsoredBills: {},
        repStatements: {},
        news: {},
        repPhoto: {},
    });

    const handleFormSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const fetchedData = await fetchRepData(formData);
            setData(fetchedData);
            setIsFormSubmitted(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        setIsFormSubmitted(false);
    };

    return (
        <>
            {!isFormSubmitted && !isLoading && (
                <div className="container vh-100 d-flex flex-column justify-content-between">
                    <div className="my-auto">
                        <div className="row justify-content-center">
                            <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                                <div className="content-container">
                                    <h1 className="text-center">RepRadar</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                                <AddressForm onSubmit={handleFormSubmit} />
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener norefferer">@danielbrainich</a>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="container vh-100 d-flex align-items-center justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <div className="mb-2">Gathering info...</div>
                            <div className="spinner-grow text-primary" role="status"></div>
                        </div>
                    </div>
                </div>
            )}

            {isFormSubmitted && !isLoading && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 d-flex flex-column justify-content-between vh-100">
                            <div className="py-5">
                                <h2 onClick={handleClick} className="cursor-pointer text-center pb-3">RepRadar</h2>
                                <div className="nav flex-column custom-nav" id="tab-list" role="tablist" aria-orientation="vertical">
                                    <button className="custom-link active" id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile" type="button" role="tab">Profile</button>
                                    <button className="custom-link" id="finances-tab" data-bs-toggle="pill" data-bs-target="#finances" type="button" role="tab">Finances</button>
                                    <button className="custom-link" id="voting-info-tab" data-bs-toggle="pill" data-bs-target="#voting-info" type="button" role="tab">Voting</button>
                                    <button className="custom-link" id="sponsored-bills-tab" data-bs-toggle="pill" data-bs-target="#sponsored-bills" type="button" role="tab">Bills</button>
                                    <button className="custom-link" id="statements-tab" data-bs-toggle="pill" data-bs-target="#statements" type="button" role="tab">Statements</button>
                                    <button className="custom-link" id="news-tab" data-bs-toggle="pill" data-bs-target="#news" type="button" role="tab">News</button>
                                </div>
                            </div>
                            <div className="pb-4">
                            <div className="mb-5" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                                <AddressForm onSubmit={handleFormSubmit} />
                            </div>
                        </div>
                        <div className="col-md-9 rep-content-container p-4 mb-2">
                            <div className="tab-content" id="tab-content">
                                <div className="tab-pane fade show active mt-5" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div>
                                        <Profile profile={data.representativeInfo}  info={data.proPublicaInfo} photo={data.repPhoto.imageUrl} />
                                    </div>
                                </div>
                                <div className="tab-pane fade mt-5" id="finances" role="tabpanel" aria-labelledby="finances-tab">
                                    <Finances contributions={data.repContribData} summary={data.repContribSummary} name={data.representativeInfo.representative.name}/>
                                </div>
                                <div className="tab-pane fade mt-5" id="voting-info" role="tabpanel" aria-labelledby="voting-info-tab">
                                    <VotingInfo info={data.proPublicaInfo} name={data.representativeInfo.representative.name}/>
                                </div>
                                <div className="tab-pane fade mt-5" id="sponsored-bills" role="tabpanel" aria-labelledby="sponsored-bills-tab">
                                    <SponsoredBills sponsoredBills={data.repSponsoredBills} name={data.representativeInfo.representative.name}/>
                                </div>
                                <div className="tab-pane fade mt-5" id="statements" role="tabpanel" aria-labelledby="statements-tab">
                                    <Statements statements={data.repStatements} name={data.representativeInfo.representative.name}/>
                                </div>
                                <div className="tab-pane fade mt-5" id="news" role="tabpanel" aria-labelledby="news-tab">
                                    <News news={data.news} name={data.representativeInfo.representative.name}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default RepInfo;
