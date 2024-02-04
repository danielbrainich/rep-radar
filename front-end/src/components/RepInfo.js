import React, { useState } from 'react';
import fetchRepData from '../api/fetchRepData';
import AddressForm from './AddressForm';
import Profile from './Profile';
import ContributionsTable from './Finances';
import CongressGovPhoto from './CongressGovPhoto';
import SponsoredBills from './Bills';
import Statements from './Statements';
import News from './News';
import VotingInfo from './Voting';

function RepInfo() {
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

    const handleClick = async () => {
        setIsFormSubmitted(false);
    }

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
