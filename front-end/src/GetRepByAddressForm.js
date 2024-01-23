import React, { useState } from 'react';
import fetchRepData from './api/fetchRepData';
import AddressForm from './components/AddressForm';
import Profile from './components/Profile';
import ContributionsTable from './components/ContributionsTable';
import CongressGovPhoto from './components/CongressGovPhoto';
import SponsoredBills from './components/SponsoredBills';
import Statements from './components/Statements';
import News from './components/News';
import VotingInfo from './components/VotingInfo';

function GetRepByAddressForm() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
        const fetchedData = await fetchRepData(formData);
        setData(fetchedData);
        setIsFormSubmitted(true);
    };

    return (
        <>
            {!isFormSubmitted &&
                <div className="container vh-100">
                    <div className="row vh-100">
                        <div className="col-md-3">
                            <AddressForm onSubmit={handleFormSubmit} />
                        </div>
                    </div>
                </div>
            }

            {isFormSubmitted && (
                <div className="container vh-100">
                    <div className="row vh-100">
                        <div className="col-md-3">
                            <div className="d-flex flex-column">
                                <div className="pb-5">
                                    <AddressForm onSubmit={handleFormSubmit} />
                                </div>
                                <div className="nav flex-column nav-pills me-3" id="tab-list" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link active" id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile" type="button" role="tab">Profile</button>
                                    <button className="nav-link" id="finances-tab" data-bs-toggle="pill" data-bs-target="#finances" type="button" role="tab">Finances</button>
                                    <button className="nav-link" id="voting-info-tab" data-bs-toggle="pill" data-bs-target="#voting-info" type="button" role="tab">Voting Info</button>
                                    <button className="nav-link" id="sponsored-bills-tab" data-bs-toggle="pill" data-bs-target="#sponsored-bills" type="button" role="tab">Sponsored Bills</button>
                                    <button className="nav-link" id="statements-tab" data-bs-toggle="pill" data-bs-target="#statements" type="button" role="tab">Statements</button>
                                    <button className="nav-link" id="news-tab" data-bs-toggle="pill" data-bs-target="#news" type="button" role="tab">News</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 rep-content-container p-4 mb-2">
                            <div className="tab-content" id="tab-content">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <CongressGovPhoto info={data.proPublicaInfo} photo={data.repPhoto.imageUrl} />
                                    <Profile profile={data.representativeInfo} />
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

export default GetRepByAddressForm;
