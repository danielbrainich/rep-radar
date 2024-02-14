import React, { useState } from 'react';
import fetchRepData from '../api/fetchRepData';
import AddressForm from './AddressForm';
import Profile from './Profile';
import Finances from './Finances';
import SponsoredBills from './Bills';
import Statements from './Statements';
import News from './News';
import VotingInfo from './Voting';
import Footer from './Footer';

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
                <div className="container vh-100 d-flex flex-column align-items-center">
                    <div className="my-auto">
                        <div className="row justify-content-center">
                            <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 p-4">
                                <h1 className="text-center">RepRadar</h1>
                                <p>Rep Radar is a civic engagement tool that compiles and serves up info about members of the U.S. House of Representatives. Enter your
                                    address below to find your rep and view tons of useful information about them: voting record, campaign finances, sponsored bills, public
                                    statements, press coverage, and more. Rep Radar compiles info dynamically from multiple online resources, so the info is always up to date. Enjoy!
                                </p>
                                <AddressForm onSubmit={handleFormSubmit} text={"Find my rep"}/>
                            </div>
                        </div>
                    </div>
                    <Footer />
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
                        <div className="col-md-6 col-lg-3 d-flex flex-column justify-content-between vh-md-100 mb-5">
                            <div className="py-5">
                                <h2 onClick={handleClick} className="cursor-pointer text-center pb-3">RepRadar</h2>
                                <div className="nav flex-column custom-nav" id="tab-list" role="tablist" aria-orientation="vertical">
                                    <button className="custom-link active" id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile" type="button" role="tab">Your rep</button>
                                    <button className="custom-link" id="finances-tab" data-bs-toggle="pill" data-bs-target="#finances" type="button" role="tab">Finances</button>
                                    <button className="custom-link" id="voting-info-tab" data-bs-toggle="pill" data-bs-target="#voting-info" type="button" role="tab">Voting</button>
                                    <button className="custom-link" id="sponsored-bills-tab" data-bs-toggle="pill" data-bs-target="#sponsored-bills" type="button" role="tab">Bills</button>
                                    <button className="custom-link" id="statements-tab" data-bs-toggle="pill" data-bs-target="#statements" type="button" role="tab">Statements</button>
                                    <button className="custom-link" id="news-tab" data-bs-toggle="pill" data-bs-target="#news" type="button" role="tab">News</button>
                                </div>
                            </div>
                            <div className="pb-4">
                            <div className="mb-5" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                                <AddressForm onSubmit={handleFormSubmit} text={"Find another rep"}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-9 d-flex flex-column justify-content-start">
                            <div className="tab-content d-flex flex-column flex-grow-1" id="tab-content">
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="d-flex flex-column min-vh-100">
                                        <div className="flex-grow-1">
                                            <Profile profile={data.representativeInfo}  info={data.proPublicaInfo} photo={data.repPhoto.imageUrl} />
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="finances" role="tabpanel" aria-labelledby="finances-tab">
                                    <div className="d-flex flex-column min-vh-100">
                                        <div className="flex-grow-1">
                                            <Finances contributions={data.repContribData} summary={data.repContribSummary} name={data.representativeInfo.representative.name}/>
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="voting-info" role="tabpanel" aria-labelledby="voting-info-tab">
                                    <div className="d-flex flex-column min-vh-100">
                                        <div className="flex-grow-1">
                                            <VotingInfo info={data.proPublicaInfo} name={data.representativeInfo.representative.name}/>
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="sponsored-bills" role="tabpanel" aria-labelledby="sponsored-bills-tab">
                                    <div className="d-flex flex-column min-vh-100">
                                        <div className="flex-grow-1">
                                            <SponsoredBills sponsoredBills={data.repSponsoredBills} name={data.representativeInfo.representative.name}/>
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="statements" role="tabpanel" aria-labelledby="statements-tab">
                                    <div className="d-flex flex-column min-vh-100">
                                        <div className="flex-grow-1">
                                            <Statements statements={data.repStatements} name={data.representativeInfo.representative.name}/>
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">
                                    <div className="d-flex flex-column min-vh-100">
                                        <div className="flex-grow-1">
                                            <News news={data.news} name={data.representativeInfo.representative.name}/>
                                        </div>
                                        <Footer />
                                    </div>
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
