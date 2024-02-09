import React, { useState } from 'react';
import fetchRepData from '../api/fetchRepData';
import AddressForm from './AddressForm';
import Profile from './Profile';
import ContributionsTable from './Finances';
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
            console.log("fetchedData", fetchedData);
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
                <div className="container vh-100 d-flex align-items-center justify-content-center">
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
            )}

            {isLoading && (
                <div className="container vh-100">
                    <div className="row vh-100">
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
                        <div className="col-md-3">
                            <div className="d-flex flex-column">
                                <div className="pb-5">
                                <button onClick={handleClick} className="btn btn-primary" type="submit">New Search</button>
                                </div>
                                <div className="nav flex-column custom-nav" id="tab-list" role="tablist" aria-orientation="vertical">
                                    <button className="custom-link active" id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile" type="button" role="tab">Profile</button>
                                    <button className="custom-link" id="finances-tab" data-bs-toggle="pill" data-bs-target="#finances" type="button" role="tab">Finances</button>
                                    <button className="custom-link" id="voting-info-tab" data-bs-toggle="pill" data-bs-target="#voting-info" type="button" role="tab">Voting</button>
                                    <button className="custom-link" id="sponsored-bills-tab" data-bs-toggle="pill" data-bs-target="#sponsored-bills" type="button" role="tab">Bills</button>
                                    <button className="custom-link" id="statements-tab" data-bs-toggle="pill" data-bs-target="#statements" type="button" role="tab">Statements</button>
                                    <button className="custom-link" id="news-tab" data-bs-toggle="pill" data-bs-target="#news" type="button" role="tab">News</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 rep-content-container p-4 mb-2">
                            <div className="tab-content" id="tab-content">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <Profile profile={data.representativeInfo}  info={data.proPublicaInfo} photo={data.repPhoto.imageUrl} />
                                </div>
                                <div className="tab-pane fade" id="finances" role="tabpanel" aria-labelledby="finances-tab">
                                    <ContributionsTable contributions={data.repContribData} summary={data.repContribSummary} />
                                </div>
                                <div className="tab-pane fade" id="voting-info" role="tabpanel" aria-labelledby="voting-info-tab">
                                    <VotingInfo info={data.proPublicaInfo} />
                                </div>
                                <div className="tab-pane fade" id="sponsored-bills" role="tabpanel" aria-labelledby="sponsored-bills-tab">
                                    <SponsoredBills sponsoredBills={data.repSponsoredBills} />
                                </div>
                                <div className="tab-pane fade" id="statements" role="tabpanel" aria-labelledby="statements-tab">
                                    <Statements statements={data.repStatements} />
                                </div>
                                <div className="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">
                                    <News news={data.news} />
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
